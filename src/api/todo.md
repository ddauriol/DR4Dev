## Iniciar API Fast API:

### Iniciar projeto com Poetry

_Instalar Ferramentas para dev:_

- [x] Black
- [x] flake8
- [x] autopep8
- [x] pytest

```toml
[tool.black]
line-length = 80
target-version = ['py38']
include = '\.pyi?$'
exclude = '''
(
  /(
      \.eggs         # exclude a few common directories in the
    | \.git          # root of the project
    | \.hg
    | \.mypy_cache
    | \.tox
    | \.venv
    | _build
    | buck-out
    | build
    | dist
  )/
)
'''
```

_Instalar Ferramentas para o projeto:_

- [x] fastapi
- [x] uvicorn
- [x] motor
- [x] pyyaml
- [x] python-dotenv
- [x] dnspython
- [x] asyncio
- [x] aiofiles
- [x] python-multipart

_Estruturar as pastas_
DR4Dev

```bash
   __init__.py
   main.py
   - config
      __init__.py
      config.py
      config.yml
   - routes
     __init__.py
     - files
       __init__.py
       models.py
       routes.py
     - users
       __init__.py
       models.py
       routes.py
     - actions
       __init__.py
       models.py
       routes.py
   - utils
     __init__.py
```

_Configurações do Projeto:_

- [x] Criar DB no MongoAtlas (Compass)
- [ ] fastapi
- [ ] Menssagens (Criar um arquivo de MSG)
- [ ] Iniciar o código da API
