export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="container-custom py-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            About Apex Labs Australia
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advancing research science through precision peptide chemistry and rigorous quality standards.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Foundation</h2>
            <p className="text-lg text-slate-700 mb-4 leading-relaxed">
              Apex Labs Australia was established in 2019 by a team of research biochemists and biotech professionals committed to advancing laboratory research through access to high-purity peptide compounds. Our founders recognized a critical need in the Australian research market for a reliable supplier of research-grade peptides backed by rigorous quality assurance and professional customer support.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Since our inception, we have become a trusted partner for academic institutions, independent laboratories, and research organizations across Australia and internationally. Our foundation is built on three core principles: scientific accuracy, analytical transparency, and unwavering commitment to research integrity.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Quality Without Compromise</h2>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Every peptide compound supplied by Apex Labs Australia undergoes comprehensive analytical verification before release. We maintain batch-level purity documentation, utilizing liquid chromatography-mass spectrometry (LC-MS) and high-performance liquid chromatography (HPLC) to verify compound identity and purity standards.
              </p>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Our laboratory operates under strict Standard Operating Procedures (SOPs) that align with international research material handling guidelines. Each batch is assigned a unique tracking identifier, enabling full traceability from synthesis through delivery.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                All products are supplied as lyophilized powder in inert containers. This format ensures stability during standard shipping and storage, eliminating the need for temperature-controlled transport. We exclude additives and fillers that could compromise analytical research applications.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Quality Certifications</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-700"><strong>Analytical Verification:</strong> LC-MS and HPLC batch testing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-700"><strong>Batch Tracking:</strong> Unique identifiers for complete traceability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-700"><strong>Shipping Format:</strong> Lyophilized powder for stable transport</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-700"><strong>Handling Protocols:</strong> ISO-aligned SOP compliance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400 font-bold">•</span>
                  <span className="text-slate-700"><strong>Purity Standards:</strong> ≥98% certified purity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing & Sourcing */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Manufacturing & Sourcing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">International Partnerships</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Apex Labs Australia partners with GMP-certified peptide synthesis facilities throughout North America and Europe. These partnerships allow us to maintain access to the latest synthetic chemistry methodologies while maintaining direct oversight of quality control protocols.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Quality Control Processes</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                All compounds undergo independent third-party analytical verification before Australian import. We maintain comprehensive documentation of synthesis procedures, purification methods, and analytical results for each batch supplied to research customers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Research Material Standards</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our sourcing meets international research material standards for pharmaceutical precursors and peptide chemistry compounds. We comply with research use specifications and maintain documentation compatible with institutional review boards and research ethics oversight.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Supply Chain Transparency</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Certificate of analysis (COA) documentation is provided for every order, detailing synthetic source, purification method, purity percentage, and analytical test results. This transparency enables researchers to make informed decisions about compound suitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Australian Operations */}
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Australian Operations & Support</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Our Australian distribution hub enables rapid domestic delivery to laboratories, universities, and research facilities. Operating from a state-of-the-art facility in Melbourne, we maintain rigorous storage protocols and professional packaging standards to ensure compound integrity upon arrival.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                All orders arrive in discrete, professional packaging with comprehensive documentation including batch COAs, storage instructions, and research-use compliance information. We prioritize security and confidentiality in all deliveries.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our Australian support team provides technical guidance regarding compound handling, storage optimization, and research protocol support. We are accessible to answer questions regarding product specifications and research applications.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Local Advantages</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Fast Domestic Shipping</h4>
                  <p className="text-slate-700">Next-business-day delivery to major Australian cities via secure courier</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Australian Support Team</h4>
                  <p className="text-slate-700">Direct access to local biosecurity and compliance expertise</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Lyophilized Powder Format</h4>
                  <p className="text-slate-700">Stable powder form shipped in secure, inert containers without temperature requirements</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Regulatory Compliance</h4>
                  <p className="text-slate-700">Full adherence to Australian biosecurity and research material regulations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Vision</h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Apex Labs Australia exists to accelerate scientific advancement through reliable access to research-grade peptide compounds. We believe that rigorous research requires uncompromising standards of purity, accuracy, and transparency—values that define every aspect of our operations.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Our vision is to be the most trusted peptide supplier for Australian and international researchers, distinguished by our commitment to scientific integrity, analytical excellence, and professional customer support. We support discovery-driven research, enabling scientists to focus on breakthrough findings rather than sourcing challenges.
          </p>
        </div>
      </section>
    </div>
  );
}
