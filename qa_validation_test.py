from playwright.sync_api import sync_playwright, expect
import time

def verify_qa_validations():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # using a persistent or larger timeout just in case it's rendering slow
        context = browser.new_context()
        page = context.new_page()

        try:
            print("Navegando directamente a login...")

            page.goto("http://localhost:5173/")
            page.evaluate("window.localStorage.setItem('ganadepro-settings', JSON.stringify({state: {hasSeenOnboarding: true}}))")

            # Now we can safely go to login
            page.goto("http://localhost:5173/auth/login")
            page.wait_for_timeout(2000)

            expect(page.get_by_role("heading", name="Ingresar a GanadePro")).to_be_visible()

            # By default HTML5 prevents empty fields because we use `required`.
            # To test custom react validators, we use evaluate to disable form validation entirely.
            page.evaluate("document.querySelector('form').setAttribute('novalidate', 'novalidate')")

            print("Probando login vacio...")
            page.locator('button[type="submit"]').click()
            page.wait_for_timeout(500)

            expect(page.locator('.text-red-400').first).to_contain_text("El correo electrónico es requerido")

            print("Enviando mal formato de correo...")
            page.locator('input[type="email"]').fill("bad_email")
            page.locator('button[type="submit"]').click()
            page.wait_for_timeout(500)
            expect(page.locator('.text-red-400').first).to_contain_text("El formato del correo es inválido")

            print("Arreglando correo pero sin pass...")
            page.locator('input[type="email"]').fill("test@ganadepro.com")
            # Clear pass just in case
            page.locator('input[type="password"]').fill("")
            page.locator('button[type="submit"]').click()
            page.wait_for_timeout(500)
            expect(page.locator('.text-red-400').first).to_contain_text("La contraseña es requerida")

            print("Pruebas E2E de validación de QA completadas con éxito.")

        except Exception as e:
            print(f"Error durante pruebas de QA: {e}")
            page.screenshot(path="qa_error.png")
            raise e
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    verify_qa_validations()
