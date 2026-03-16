import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Gavel, ClipboardCheck, Scale, History, FileText } from 'lucide-react';

export default function Terms() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from('.policy-content', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-offwhite pt-44 pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="policy-content mb-16 text-center">
          <div className="w-20 h-20 bg-bronze/10 rounded-3xl flex items-center justify-center text-bronze mx-auto mb-8">
            <Gavel size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-softblack uppercase tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-softblack/60 font-body">
            Policies governing enrollment and conduct at Imarisha Jamii Centre.
          </p>
        </div>

        <div className="policy-content prose prose-lg font-body text-softblack/80 space-y-12">
          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <ClipboardCheck className="text-bronze" size={24} /> 1. Enrollment & Admission
            </h2>
            <p>
              Admission to Imarisha Jamii Centre is subject to a placement interview and verification of previous academic credentials. Applicants must provide honest and accurate information during the application process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <Scale className="text-bronze" size={24} /> 2. Code of Conduct
            </h2>
            <p>
              As an institution focused on adult education, we maintain an environment of mutual respect. Students are expected to conduct themselves professionally and respect the learning environment of their peers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <History className="text-bronze" size={24} /> 3. Attendance & Progress
            </h2>
            <p>
              Regular attendance is encouraged to ensure academic success, especially for our condensed KCSE compilation programs. Progress is monitored through periodic assessments and internal examinations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <FileText className="text-bronze" size={24} /> 4. Program Changes
            </h2>
            <p>
              The management of Imarisha Jamii Centre reserves the right to adjust class schedules and program modules as necessary to maintain education quality and comply with national curriculum standards.
            </p>
          </section>

          <div className="pt-12 border-t border-softblack/10 text-center text-sm text-softblack/40 italic">
            Last updated: March 2026
          </div>
        </div>
      </div>
    </div>
  );
}
