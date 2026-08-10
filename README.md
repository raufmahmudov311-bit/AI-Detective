# AI Detective

Mobile-first detective / murder mystery web app. Next.js 14 (App Router) + TypeScript + Tailwind. Free-tier MVP with mock data — see `architecture.md` (in the previous delivery) for the database/AI-generation/Pro-subscription plan this is built to grow into.

## Lokal olaraq işə salmaq

```bash
npm install
npm run dev
```

Sonra `http://localhost:3000` aç.

## GitHub-a yükləmək

```bash
git init
git add .
git commit -m "AI Detective MVP"
git branch -M main
git remote add origin https://github.com/<istifadəçi-adın>/ai-detective.git
git push -u origin main
```

`node_modules` və `.next` `.gitignore`-da artıq var, ona görə onları yükləməyəcək.

## Vercel-ə deploy

1. https://vercel.com üzərinə GitHub hesabınla daxil ol.
2. "Add New Project" → yuxarıda push etdiyin repo-nu seç.
3. Framework avtomatik **Next.js** kimi tanınacaq — heç bir əlavə tənzimləmə lazım deyil.
4. "Deploy" düyməsinə bas. Bir neçə dəqiqəyə canlı link alacaqsan (`*.vercel.app`).

Hər dəfə `main` branch-ə push etdikdə Vercel avtomatik yenidən deploy edir.

## Layihə strukturu

```
app/
  page.tsx              → Home
  daily/page.tsx         → Daily Case
  cases/page.tsx         → Case Archive (difficulty filter)
  case/[id]/page.tsx      → Investigation (scene / suspects / evidence / timeline / accusation / result)
  leaderboard/page.tsx    → Leaderboard
  profile/page.tsx        → Profile (rank, badges)
  pro/page.tsx             → Pro paywall (UI only, no real payment yet)
components/               → shared UI (TopBar, BottomNav, case-file styled primitives)
lib/data.ts                → mock case/leaderboard data — swap for real API calls later
lib/types.ts                → shared TypeScript types
```

## Hazırkı vəziyyət

Bütün data `lib/data.ts` içində mock olaraq saxlanılır (backend yoxdur). Bu, GitHub/Vercel-ə yükləyib canlı görmək və interfeysi sınamaq üçün tam işləyən bir frontend-dir. Backend (verilənlər bazası, autentifikasiya, AI case generation) əlavə etmək üçün əvvəlki mesajda göndərdiyim `architecture.md` sənədindəki planı izləyə bilərsən.
