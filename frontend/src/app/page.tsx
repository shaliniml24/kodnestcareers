import Link from "next/link";
import { ArrowRight, CheckCircle, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-background to-secondary/20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Find Your Dream Code <br />
          <span className="text-primary">Without Gravity Holding You Back</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          KodNestCareers connects top-tier developers with innovative companies.
          Experience the future of hiring with our AI-powered matching.
        </p>
        <div className="flex gap-4">
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-white transition-colors bg-primary rounded-full hover:bg-primary/90"
          >
            Browse Jobs <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-primary transition-colors bg-secondary rounded-full hover:bg-secondary/80"
          >
            Create Profile
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
            <p className="text-muted-foreground">
              Our algorithms parse your resume and match you with jobs that fit your skills perfectly.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Companies</h3>
            <p className="text-muted-foreground">
              We vet every company to ensure you only apply to legitimate and high-quality opportunities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-primary/10 mb-4">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Track</h3>
            <p className="text-muted-foreground">
              Skip the queue. Your profile gets highlighted to recruiters when you are a strong match.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
