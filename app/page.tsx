import LandingHeader from "@/components/pages/landing/landing-header";
import Login from "@/components/pages/landing/login";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="grid min-h-screen place-content-center">
        <Login />
      </main>
    </>
  );
}
