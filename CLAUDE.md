# Plus Vending — Note per lo sviluppo

## Deploy: Coolify + Docker + Nginx

Il sito è un progetto **Astro statico** deployato su **Coolify** con Docker.
Coolify usa **Traefik** come reverse proxy davanti al container.

### Architettura

```
Browser → Traefik (porta 80/443) → Container Docker (nginx porta 4321)
```

### Regola importante: `port_in_redirect off`

Nginx nel container ascolta su porta **4321** (interna). Traefik espone il sito sulle porte **80/443**.
Senza `port_in_redirect off`, quando nginx fa un redirect 301 (es. `/distributori` → `/distributori/`)
genera un Location header con la porta interna:

```
Location: http://dominio:4321/distributori/
```

La porta 4321 non è esposta pubblicamente → il browser riceve `ERR_CONNECTION_REFUSED`.
Con `port_in_redirect off` il redirect diventa corretto:

```
Location: http://dominio/distributori/
```

**Non rimuovere mai `port_in_redirect off` dal Dockerfile.**

### Aggiungere nuove pagine

Astro genera pagine statiche come `dist/nomepagina/index.html`.
Nginx con `try_files $uri $uri/ =404` + `index index.html` le serve correttamente.
Non serve toccare la config nginx quando si aggiungono nuove pagine Astro.
