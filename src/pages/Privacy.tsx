import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function Privacy() {
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
            <Shield size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-extrabold text-softblack uppercase tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-softblack/60 font-body">
            How we handle and protect your information at Imarisha Jamii Centre.
          </p>
        </div>

        <div className="policy-content prose prose-lg font-body text-softblack/80 space-y-12">
          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <Lock className="text-bronze" size={24} /> 1. Data Collection
            </h2>
            <p>
              We collect information you provide directly to us through our application and contact forms. This includes your name, phone number, email address, and academic history. We only collect information necessary for the admission and enrollment process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <Eye className="text-bronze" size={24} /> 2. Use of Information
            </h2>
            <p>
              Your data is used solely for the purpose of communicating with you regarding your interest in our programs, processing your application, and providing educational services. We do not sell or share your personal information with third-party marketing companies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <Shield className="text-bronze" size={24} /> 3. Data Protection
            </h2>
            <p>
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. Physical applications are stored securely at our center, and digital inquiries are handled through secure, encrypted channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-softblack mb-4 flex items-center gap-3">
              <FileText className="text-bronze" size={24} /> 4. Your Rights
            </h2>
            <p>
              You have the right to request access to the information we hold about you, or to request its correction or deletion at any time. For such requests, please contact our administration office directly.
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
