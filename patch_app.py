import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Remove import
content = re.sub(r"import \{ Register \} from '\./pages/auth/Register';\n", "", content)

# Remove route
route_pattern = r"        <Route\s*path=\"/auth/register\"\s*element=\{!session \? <Register /> : <Navigate to=\"/\" />\}\s*/>\n"
content = re.sub(route_pattern, "", content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
