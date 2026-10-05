import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ConsentLink } from "@/components/CookieConsent";
import { info, legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales & confidentialité — Rond de Carotte",
  description: "Mentions légales et politique de confidentialité du site Rond de Carotte.",
  alternates: { canonical: "/mentions-legales" },
};

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-olive/10 py-10">
      <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-bark [&_a]:text-olive [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-clay [&_strong]:font-medium [&_strong]:text-olive">
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 pb-20 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Rond de Carotte — accueil">
          <Image src="/logo.png" alt="Rond de Carotte" width={1000} height={353} priority className="h-12 w-auto sm:h-14" />
        </Link>
        <Link
          href="/"
          className="rounded-full border border-olive/25 px-5 py-2.5 text-sm transition-colors hover:border-olive"
        >
          ← Retour au site
        </Link>
      </header>

      <main>
        <h1 className="mt-16 font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-tight">
          Mentions
          <br />
          légales
        </h1>
        <p className="mt-6 mb-12 text-sm text-bark/70">
          Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique (LCEN).
        </p>

        <Section title="Éditeur du site">
          <p>
            Le site <strong>ronddecarotte.com</strong> est édité par la société <strong>{legal.company}</strong>,
            exploitant l&apos;établissement « {info.name} ».
          </p>
          <ul className="space-y-1">
            <li>{legal.form} au capital de {legal.capital}</li>
            <li>Siège social : {info.address}, {info.city}</li>
            <li>{legal.rcs} — SIRET {legal.siret}</li>
            <li>N° de TVA intracommunautaire : {legal.vat}</li>
            <li>
              Téléphone : <a href={info.phoneHref}>{info.phone}</a>
            </li>
          </ul>
          <p>
            Directeur de la publication : <strong>{legal.publisher}</strong>, gérant.
          </p>
        </Section>

        <Section title="Hébergement">
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723,
            États-Unis — <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a>.
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus de ce site (textes, photographies, logo, cartes) est la propriété de{" "}
            {legal.company} ou utilisé avec autorisation. Toute reproduction, représentation ou diffusion, totale
            ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </Section>

        <Section id="confidentialite" title="Données personnelles">
          <p>
            Ce site est une vitrine : il ne comporte <strong>aucun formulaire</strong> et ne collecte
            directement aucune donnée personnelle (nom, e-mail, téléphone…).
          </p>
          <p>
            <strong>Réservations.</strong> Les réservations en ligne sont gérées par{" "}
            <a href="https://www.covermanager.com" target="_blank" rel="noreferrer">CoverManager</a>, sur leur
            propre site. Les informations que vous y saisissez sont traitées par {legal.company} pour gérer
            votre réservation, et par CoverManager en tant que prestataire, selon sa propre politique de
            confidentialité.
          </p>
          <p>
            <strong>Cartes.</strong> Les cartes au format PDF sont hébergées sur Google Drive. En les ouvrant,
            vous quittez ce site : la politique de confidentialité de Google s&apos;applique alors.
          </p>
          <p>
            <strong>Vos droits.</strong> Conformément au Règlement général sur la protection des données (RGPD)
            et à la loi « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement, d&apos;opposition et de limitation du traitement de vos données.
            Pour l&apos;exercer, contactez-nous par téléphone au {info.phone} ou par courrier à l&apos;adresse
            du siège. Vous pouvez également introduire une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">CNIL</a>.
          </p>
        </Section>

        <Section id="cookies" title="Cookies & mesure d'audience">
          <p>
            Ce site ne dépose <strong>aucun cookie publicitaire</strong> et ne vous suit pas d&apos;un site à
            l&apos;autre.
          </p>
          <p>
            <strong>Avec votre accord uniquement</strong>, nous mesurons la fréquentation et les performances du
            site grâce à Vercel Analytics et Vercel Speed Insights. Ces outils fonctionnent sans cookie et
            produisent des statistiques anonymes et agrégées (pages vues, pays, type d&apos;appareil). Aucune
            mesure n&apos;est lancée tant que vous n&apos;avez pas cliqué sur « Accepter ».
          </p>
          <p>
            Votre choix est enregistré dans votre navigateur pendant 6 mois, puis vous est de nouveau demandé.
            Vous pouvez le modifier à tout moment :
          </p>
          <ConsentLink className="rounded-full bg-olive px-6 py-3 text-sm text-cream transition-colors hover:bg-clay" />
        </Section>

        <p className="border-t border-olive/10 pt-8 text-xs text-bark/60">Dernière mise à jour : octobre 2026.</p>
      </main>
    </div>
  );
}
