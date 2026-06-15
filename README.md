<div align="center">
  <img src="images/rounded%20avenue.png" alt="Avenue Grill & Restaurant" width="160" />

  # Avenue Grill & Restaurant

  **Website & Online Ordering Platform** · Gitimbine, Meru, Kenya

  *"Good Food. Great Mood. Better Together."*
</div>

---

A web platform that **markets** Avenue Grill & Restaurant and takes **online orders for delivery**,
paid via **M-Pesa (STK Push)** or **Cash on Delivery**, with a staff **admin dashboard** to manage the
menu and run the order queue.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | **Next.js** (App Router, TypeScript) + **Tailwind CSS** + shadcn/ui |
| Backend | **Java + Spring Boot** (REST API) |
| Database | **PostgreSQL** (Flyway migrations) |
| Payments | **M-Pesa** via Safaricom Daraja (STK Push) + Cash on Delivery |
| Hosting | Frontend → **Vercel** · Backend + DB → **Railway/Render** |
| CI/CD | **GitHub Actions** |

## Documentation

Start with **[CLAUDE.md](CLAUDE.md)** (project brief & conventions), then the docs set:

| Doc | What's inside |
|---|---|
| [docs/00 — Project Overview](docs/00-PROJECT-OVERVIEW.md) | Vision, brand, goals, users, risks |
| [docs/01 — SRS](docs/01-SRS.md) | Functional & non-functional requirements, use cases |
| [docs/02 — Architecture](docs/02-ARCHITECTURE.md) | System, component, deployment, payment flow (diagrams) |
| [docs/03 — Data Model](docs/03-DATA-MODEL.md) | ERD, entities, PostgreSQL schema |
| [docs/04 — API Specification](docs/04-API-SPECIFICATION.md) | REST API contract |
| [docs/05 — Implementation Plan](docs/05-IMPLEMENTATION-PLAN.md) | Phased roadmap & milestones |
| [docs/06 — Design System](docs/06-DESIGN-SYSTEM.md) | Brand tokens, typography, components, UX |
| [docs/07 — Restaurant Web Best Practices](docs/07-RESTAURANT-WEBSITE-BEST-PRACTICES.md) | What best-in-class restaurant sites contain |
| [docs/08 — M-Pesa Integration](docs/08-MPESA-INTEGRATION.md) | Safaricom Daraja STK Push guide |
| [docs/09 — DevOps & CI/CD](docs/09-DEVOPS-CICD.md) | Environments, pipelines, deployment, monitoring |
| [docs/10 — Security & Compliance](docs/10-SECURITY-AND-COMPLIANCE.md) | Security baseline + Kenya DPA 2019 |

There's also an index at [docs/README.md](docs/README.md).

## Scope (MVP)

Marketing site + menu + cart + delivery checkout + **M-Pesa & Cash on Delivery** + order tracking +
admin dashboard. Pickup, dine-in reservations, catering, loyalty, reviews, and card payments are on the
[roadmap](docs/05-IMPLEMENTATION-PLAN.md#3-post-mvp-roadmap-later-phases).

## Project status

🟡 **Planning complete — pre-build.** The repository currently holds brand assets and the full
documentation set. Application code (`frontend/`, `backend/`, `infra/`) is created starting at
**Phase 0** of the [implementation plan](docs/05-IMPLEMENTATION-PLAN.md).

## Repository layout (target)

```
AvenueGrillApp/
├── CLAUDE.md          # project brief & conventions (read first)
├── README.md          # you are here
├── docs/              # planning & reference docs
├── frontend/          # Next.js app           (created in Phase 0)
├── backend/           # Spring Boot app        (created in Phase 0)
├── infra/             # docker-compose, deploy (created in Phase 0)
├── .github/workflows/ # CI/CD pipelines        (created in Phase 0)
└── images/            # brand assets
```

## Contact

📞 0741 029 405 · 🕙 Open daily 10:00–22:00 EAT · 📍 Gitimbine, Meru, Kenya · FB / IG / TikTok
