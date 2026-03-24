from playwright.sync_api import sync_playwright, expect
import time
import random

def run_qa_onboarding():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a new context each time
        context = browser.new_context(record_video_dir="/home/jules/verification/video_onboarding")
        page = context.new_page()

        # Generate a random email so the test doesn't fail on "already registered"
        random_suffix = random.randint(1000, 99999)
        test_email = f"qa_test_{random_suffix}@ganadepro.com"
        test_pass = "secret123"

        try:
            print(f"--- Iniciando QA E2E Onboarding con {test_email} ---")

            # Navegar directamente a Step 1 para obviar localstorage y slider
            page.goto("http://localhost:5173/onboarding/step1")
            page.wait_for_timeout(2000)

            print("1. Step 1: Llenando datos de registro")
            # Verificar que estamos en Step 1
            expect(page.get_by_role("heading", name="Crear Cuenta")).to_be_visible()

            # En Step 1
            page.locator('input[type="email"]').fill(test_email)
            page.locator('input[type="password"]').fill(test_pass)
            page.locator('input[type="checkbox"]').check() # Accept terms

            # Submit form
            page.locator('button[type="submit"]').click()

            # Check for potential errors that appear
            try:
                page.wait_for_selector(".error-box", timeout=3000)
                error_text = page.locator(".error-box").first.inner_text()
                print(f"Error on Step 1: {error_text}")
                raise Exception(f"Failed to register on Step 1: {error_text}")
            except Exception as e:
                if "Failed to register" in str(e):
                    raise e
                # It means no error box appeared, which is good

            # Wait for Step 2 to appear
            print("Esperando redirección a Step 2...")
            expect(page.get_by_role("heading", name="Configurar Perfil")).to_be_visible(timeout=15000)
            page.wait_for_timeout(1000)

            print("2. Step 2: Completando perfil como Dueño/Admin")
            # First text input is Full Name
            text_inputs = page.locator('input[type="text"]').all()
            if text_inputs:
                text_inputs[0].fill("Juan QA Pérez")

            # Age input is type="number"
            page.locator('input[type="number"]').fill("35")

            # PIN input (tactical input wrapper logic might have made it type text or password)
            pin_input = page.locator('input[type="password"]')
            if pin_input.count() > 0:
                 pin_input.fill("1234")
            else:
                 # maybe it is text because of tactical input visibility?
                 page.locator('input[type="text"]').nth(1).fill("1234")

            # The role is Admin by default
            page.locator('button[type="submit"]').click()

            try:
                page.wait_for_selector(".error-box", timeout=3000)
                error_text = page.locator(".error-box").first.inner_text()
                print(f"Error on Step 2: {error_text}")
                raise Exception(f"Failed to save profile on Step 2: {error_text}")
            except Exception as e:
                if "Failed to save profile" in str(e):
                    raise e

            print("Esperando redirección a Step 3 (Admin)...")
            expect(page.get_by_role("heading", name="Configurar Finca")).to_be_visible(timeout=15000)
            page.wait_for_timeout(1000)

            print("3. Step 3: Configurando Finca y Lotes")
            # First text input is Farm Name
            admin_text_inputs = page.locator('input[type="text"]').all()
            admin_text_inputs[0].fill("Finca QA La Esperanza")
            # Country
            admin_text_inputs[1].fill("Colombia")
            # Cattle type
            admin_text_inputs[2].fill("Doble Propósito")

            # Lots
            admin_text_inputs[3].fill("Lote QA 1")

            page.locator('button[type="submit"]').click()

            try:
                page.wait_for_selector(".error-box", timeout=3000)
                error_text = page.locator(".error-box").first.inner_text()
                print(f"Error on Step 3: {error_text}")
                raise Exception(f"Failed to save farm on Step 3: {error_text}")
            except Exception as e:
                if "Failed to save farm" in str(e):
                    raise e

            print("Esperando redirección al Dashboard...")
            expect(page.get_by_role("heading", name="Centro de Mando")).to_be_visible(timeout=15000)
            page.wait_for_timeout(1000)

            # Verify we see the user ID
            # In Dashboard, the email is rendered inside a span
            expect(page.locator(f'text={test_email}')).to_be_visible()

            print("--- ¡Prueba E2E de Onboarding COMPLETADA CON ÉXITO! ---")
            page.screenshot(path="qa_onboarding_success.png")
            page.wait_for_timeout(2000)

        except Exception as e:
            print(f"Error durante pruebas de QA E2E Onboarding: {e}")
            page.screenshot(path="qa_onboarding_error.png")
            raise e
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    run_qa_onboarding()
