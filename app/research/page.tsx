export default function ResearchPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 border-b border-slate-200">
        <div className="container-custom py-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Research Protocols & Standards
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive quality assurance and scientific integrity standards supporting legitimate research applications.
          </p>
        </div>
      </section>

      {/* Research Focus */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Supporting Research Science</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Apex Labs Australia supplies research-grade peptide compounds to support scientific inquiry across multiple research disciplines. Our clientele includes academic institutions, pharmaceutical research facilities, independent laboratories, and scientific research organizations conducting legitimate investigative work.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Peptide compounds represent a critical tool in contemporary biochemistry research, enabling investigations into cellular signaling pathways, protein interactions, metabolic processes, and physiological mechanisms. Our role is to provide researchers with access to high-purity compounds that enable rigorous, reproducible scientific work.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We are committed to supporting responsible research applications while maintaining strict adherence to legal and ethical guidelines for research material distribution.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Research Applications</h3>
              <ul className="space-y-4">
                <li className="text-slate-700">
                  <strong>In Vitro Studies:</strong> Cellular and biochemical research applications
                </li>
                <li className="text-slate-700">
                  <strong>Molecular Biology:</strong> Protein interaction and signaling pathway research
                </li>
                <li className="text-slate-700">
                  <strong>Pharmacological Research:</strong> Mechanism of action investigations
                </li>
                <li className="text-slate-700">
                  <strong>Analytical Chemistry:</strong> Compound characterization and validation
                </li>
                <li className="text-slate-700">
                  <strong>Academic Research:</strong> University-based investigative programs
                </li>
                <li className="text-slate-700">
                  <strong>Preclinical Studies:</strong> Laboratory-based efficacy and safety evaluations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="section-padding bg-gradient-to-br from-slate-50 via-blue-50 to-slate-25 border-b border-slate-200">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Quality Assurance Protocols</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Purity Verification</h3>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Every batch supplied by Apex Labs Australia undergoes rigorous purity analysis using advanced analytical instrumentation. We employ high-performance liquid chromatography (HPLC) coupled with mass spectrometry (MS) to verify compound identity and quantify purity percentages. All compounds meet or exceed 98% purity standards before release to research customers.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Analytical results are documented in comprehensive Certificates of Analysis (COA) provided with every order. These documents include chromatograms, mass spectrometry data, and detailed quality metrics enabling researchers to assess compound suitability for their specific applications.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Batch-Level Tracking & Documentation</h3>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Each peptide compound batch is assigned a unique tracking identifier that provides complete traceability from synthesis through analytical verification to delivery. Researchers receive detailed documentation including synthesis date, synthesis location, purification methodology, and all relevant analytical data.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                This comprehensive documentation enables researchers to maintain accurate records for institutional review purposes and supports reproducibility of research findings across multiple experimental iterations.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Quality Validation Procedures</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our quality assurance procedures include identity verification, purity quantification, and microbiological testing where applicable. We maintain comprehensive standard operating procedures (SOPs) aligned with international research material handling guidelines and maintain detailed quality documentation for audit and compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Handling */}
      <section className="section-padding bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Laboratory Handling Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Storage & Preservation</h3>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                All peptide compounds are maintained in temperature-controlled environments maintained at 2-8°C to preserve compound integrity and prevent degradation. Our storage facilities utilize inert materials and humidity-controlled containers to eliminate environmental variables that could compromise analytical quality.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Researchers receive comprehensive storage instructions with every order, including optimal storage conditions, shelf-life estimates, and protocols for compound handling to maintain purity throughout the research period.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">Professional Packaging & Delivery</h3>
              <p className="text-lg text-slate-700 mb-4 leading-relaxed">
                Compounds are packaged using sterile, inert containers with insulation designed to maintain temperature stability during transit. All shipments include freeze packs and moisture-barrier packaging to ensure compound arrives in optimal condition.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Delivery tracking and signature confirmation are provided for all orders. Researchers receive detailed handling instructions and storage guidelines designed to maintain compound integrity for the duration of their research project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Use Disclaimer */}
      <section className="section-padding bg-blue-50 border border-blue-200 rounded-lg">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Research Use Notice</h2>
          <div className="space-y-4 text-blue-900">
            <p className="text-lg leading-relaxed">
              <strong>All products supplied by Apex Labs Australia are intended for research use only.</strong> These compounds are not pharmaceutical products and are not approved for human consumption, medical treatment, or clinical use.
            </p>
            <p className="text-lg leading-relaxed">
              Products are designed for laboratory-based scientific research applications only. They are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition in human subjects or animals.
            </p>
            <p className="text-lg leading-relaxed">
              Customers are responsible for ensuring compliance with all applicable laws, regulations, and institutional policies regarding the possession, use, and disposal of research materials. Apex Labs Australia provides these compounds only to customers representing legitimate research institutions or organizations.
            </p>
            <p className="text-lg leading-relaxed">
              By purchasing products from Apex Labs Australia, customers acknowledge these compounds are for authorized research use only and accept full responsibility for appropriate handling and application.
            </p>
          </div>
        </div>
      </section>

      {/* Scientific Integrity */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Scientific Integrity & Transparency</h2>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Apex Labs Australia is committed to the highest standards of scientific integrity and transparency. We believe that responsible research requires uncompromising honesty regarding product specifications, analytical data, and appropriate use cases.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            We provide detailed analytical documentation with every order, enabling researchers to independently verify compound quality and assess suitability for their specific research applications. We do not exaggerate claims, misrepresent product capabilities, or encourage inappropriate applications.
          </p>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            Our commitment to scientific integrity includes supporting responsible research practices, maintaining strict legal and ethical guidelines for material distribution, and prioritizing transparency in all customer interactions.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            We believe that science advances through rigorous methodology, accurate documentation, and honest reporting. Our role is to provide researchers with the highest-quality tools to support their investigative work while maintaining the ethical foundations upon which legitimate scientific research depends.
          </p>
        </div>
      </section>
    </div>
  );
}
