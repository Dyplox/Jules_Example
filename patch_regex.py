with open('src/utils/validators.ts', 'r') as f:
    content = f.read()

# Replace the unnecessary escape character
content = content.replace(r"/^\+?[\d\s\-]{8,15}$/", r"/^\+?[\d\s-]{8,15}$/")

with open('src/utils/validators.ts', 'w') as f:
    f.write(content)
