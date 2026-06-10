import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("privacyTitle"),
    description: t("privacyDesc"),
  };
}

export default function PrivacyPage() {
  return (
    <main className="w-full min-h-screen px-4 py-12 bg-white text-brand-primary">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          TACTLINK PRIVACY POLICY
        </h1>

        <div className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-gray-700">
            Before using our Tactlink Application and Services, please carefully
            read our Privacy Policy. YOUR BROWSING, ACCESSING OR USING OUR
            TACTLINK APPLICATION SHALL BE DEEMED AS THAT YOU FULLY ACCEPT THIS
            PRIVACY POLICY AND COMMIT TO COMPLY WITH ALL APPLICABLE LAWS AND
            REGULATIONS. IF YOU DON&apos;T AGREE TO OUR PRIVACY POLICY, PLEASE DON&apos;T
            USE OUR TACTLINK APPLICATION AND SERVICES. IF YOU HAVE BEGUN USING
            OUR TACTLINK APPLICATION AND SERVICES, PLEASE IMMEDIATELY CANCEL
            YOUR ACCOUNT AND STOP THE USE. YOUR BROWSE AND USE OF OUR TACTLINK
            APPLICATION AND SERVICES MEANS YOU ACCEPT THAT THIS PRIVACY POLICY
            IS APPLICABLE TO YOU.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Definition and interpretation</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>&quot;API&quot;</strong> means application programming interfaces including but not limited to:</p>
              <ul className="ml-6 mt-2 space-y-1">
                <li>Facebook – login;</li>
                <li>Google – login;</li>
                <li>Linkedin – login; and</li>
                <li>Firebase – Dynamic Links;</li>
              </ul>
              <p><strong>&quot;Tactlink Application&quot;</strong> means our free or paid software branded &quot;TACTLINK©&quot;, including any web-based or browser-accessible versions, which serves as a contact management platform allowing Users to filter and search for contacts, manage digital business cards, and access related functionalities and services provided by Tactlink;</p>
              <p><strong>&quot;Personal Data&quot;</strong> refers to data, whether true or not, about an individual who can be identified (i) from that data; or (ii) from that data and other information to which the organisation has or is likely to have access. This includes but is not limited to your name, contact information, user-generated content, IP addresses, device identifiers, browser data, and cookie information;</p>
              <p><strong>&quot;Services&quot;</strong> means all features, functionalities, content, tools, and services made available by Tactlink through the Tactlink Application, including any web-based or browser-accessible versions, and/or application programming interfaces for third parties to use;</p>
              <p><strong>&quot;Us&quot;</strong> or <strong>&quot;We&quot;</strong> refers to TACTLINK PTE. LTD. (UEN: 202142753R); and</p>
              <p><strong>&quot;You&quot;</strong> refers to the users (whether registered or not) of our Tactlink Application and the purchasers of paid services.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Applicability and content of Privacy Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>2.1 Access to the Tactlink Application and use of the Services offered on the Tactlink Application by us is subject to this Privacy Policy. By accessing the Tactlink Application and by continuing to use the Services offered, you acknowledge and agree that you have read and understood this Policy and consent to our collection, use, disclosure, and/or processing of your Personal Data as described in this Privacy Policy and for the purposes set out in the Tactlink Standard Terms and Conditions (&quot;Agreement&quot;). Where required by law, we will obtain your explicit consent before processing sensitive data. We reserve the right to amend this Privacy Policy from time to time. If you disagree with any part of this Privacy Policy, you must immediately discontinue your access to the Tactlink Application and your use of the Services.</p>
              <p>2.2 As part of the normal operation of our Services, we collect, use and, in some cases, disclose information about you to third parties. Accordingly, we have developed this Privacy Policy in order for you to understand how we collect, use, communicate and disclose and make use of your Personal Data when you use the Services on the Tactlink Application:</p>
              <div className="ml-4 space-y-2">
                <p>(a) Before or at the time of collecting Personal Data, we will identify the purposes for which information is being collected.</p>
                <p>(b) We will collect and use of Personal Data solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.</p>
                <p>(c) We will only retain Personal Data as long as necessary for the fulfillment of those purposes.</p>
                <p>(d) We will collect Personal Data by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.</p>
                <p>(e) Personal Data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.</p>
                <p>(f) We will protect Personal Data by reasonable security safeguards against loss or theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
              </div>
              <p>2.3 We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of Personal Data is protected and maintained.</p>
              <p>2.4 Our Tactlink Application may support third-party service and we may replace when necessary third-party service supplier from time to time. You understand and agree that if you use third-party service via our Tactlink Application, protection of your Personal Data will be subject to the third-party&apos;s Privacy Policy.</p>
              <p>2.5 We may engage third-party service providers, agents, and other organisations to perform services on our behalf, including but not limited to hosting, data analytics, payment processing, communications delivery, and customer support.</p>
              <p>2.6 (a) We will retain your Personal Data for as long as necessary to fulfill the purposes for which it was collected, or as required or permitted by applicable laws and regulations.</p>
              <p>(b) We will cease to retain Personal Data or remove the means by which the Personal Data can be associated with you, as soon as it is reasonable to assume that the purpose for which the Personal Data was collected is no longer being served by retention.</p>
              <p>(c) In determining the appropriate retention period, we consider the amount, nature, and sensitivity of the Personal Data, the potential risk of harm from unauthorised use or disclosure, the purposes for which we process the Personal Data, and applicable legal requirements.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Collection of your Personal Data</h2>
            <div className="space-y-4 text-gray-700">
              <p>3.1 We provide and/or may provide services to you by means of website, software and other applications. We collect your information only for the purpose of providing products and services to you, improving your experience, facilitating your use of our products and services, and conducting commercial exploration of big data application.</p>
              <p>3.2 We will ask you when we need information that personally identifies you (Personal Data) or allows us to contact you. Personal Data collected by us often is limited to name, e-mail address, language, date of birth, educational background, company name, company address, company email, company contact number, company website address, company industry, country or location.</p>
              <p>3.3 The information you may upload business card during using our services can be your Personal Data or the Personal Data of others protected by laws. You shall guarantee that you have obtained the necessary authorisation to copy and upload such data information.</p>
              <p>3.4 We collect, use, and disclose the following categories of personal information:</p>
              <div className="ml-4 space-y-2">
                <p>(a) Information that you provide directly to the platform, including but not limited to names, job titles, company names, contact details, professional profiles, and other information contained in business cards, resumes, or related materials;</p>
                <p>(b) Information relating to individuals who are not registered users of the platform, but whose information is included in content submitted by you;</p>
                <p>(c) Information collected from, linked to, or referenced from third-party platforms; and</p>
                <p>(d) Any other information reasonably necessary for the operation of our platform.</p>
              </div>
              <p>3.5 Where you submit, upload, or otherwise provide personal information of third parties to the platform, you represent and warrant that you have obtained all necessary consents or have another lawful basis to disclose such information to us.</p>
              <p>3.6 We also collect certain information about your computer hardware and software including your IP address, browser type, operating system, domain name, access times and referring Web site addresses.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Use of your Personal Data</h2>
            <div className="space-y-4 text-gray-700">
              <p>4.1 We use your Personal Data for the following purposes:</p>
              <div className="ml-4 space-y-2">
                <p>(a) To ensure our site is relevant to your needs.</p>
                <p>(b) To deliver services, such as newsletters, events, software, that you request or purchase.</p>
                <p>(c) To help us create and publish content most relevant to you.</p>
                <p>(d) To alert you to product upgrades, special offers, updated information and other new services from us, if you so request.</p>
                <p>(e) To allow you access to limited-entry areas of our site as appropriate.</p>
                <p>(f) Research purposes.</p>
              </div>
              <p>4.2 We may disclose your Personal Data if required to do so by law or in the good-faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on us or the site; (b) protect and defend our rights or property; or (c) act in urgent circumstances to protect the personal safety of our employees, users of our products or services, or members of the public.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Control of your Personal Data</h2>
            <div className="space-y-4 text-gray-700">
              <p>5.1 When you register, or otherwise give us Personal Data, we will not share that information with third parties without your permission, other than for the limited exceptions already listed. It will only be used for the purposes stated above.</p>
              <p>5.2 We may send out periodic e-mails informing you of technical service or security issues related to a product or service you requested.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Access to your Personal Data</h2>
            <div className="space-y-4 text-gray-700">
              <p>6.1 We will provide you with the means to ensure that your Personal Data is correct and current.</p>
              <p>6.2 We may communicate with you regarding your Personal Data through any communication channels, including but not limited to email, SMS, in-app notifications, messaging applications, or telephone calls.</p>
              <p>6.3 You have the right under the Personal Data Protection Act 2012 to request access to your Personal Data, request correction of any inaccuracies, withdraw your consent to our use of your Personal Data, and lodge a complaint with the Personal Data Protection Commission if you believe your rights have been infringed.</p>
              <p>6.4 If you have any questions, concerns, or complaints about our processing of your Personal Data, you may contact our Data Protection Officer by email at info@tactlink.com.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Security of your Personal Data</h2>
            <div className="space-y-4 text-gray-700">
              <p>7.1 We strive to take various security technologies and measures to protect the information and data stored in systems against authorised access, use or disclosure of the same. However, we do not give any warranty that such security measures are able to curb ALL risks due to the complexity of the security environment of the internet.</p>
              <p>7.2 We perform our obligations in relation to the security and protection of Personal Data in accordance with applicable laws in Singapore, including Personal Data Protection Act 2012.</p>
              <p>7.3 In the event of any breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to Personal Data, we will assess whether the breach is notifiable under applicable laws.</p>
              <p>7.4 Where we transfer your Personal Data outside of Singapore, we will take appropriate steps to ensure that the recipient of the Personal Data provides a standard of protection comparable to that under the Personal Data Protection Act 2012.</p>
              <p>7.5 If you have any questions or concerns regarding the processing of your Personal Data, you may contact our designated Data Protection Officer at: info@tactlink.com.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Protection of Children&apos;s Personal Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>8.1 Our targeted users are not children and does not knowingly collect any personal information from children.</p>
              <p>8.2 Our Tactlink Application and Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from individuals under the age of 13 without the consent of a parent or legal guardian.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Use of Cookies</h2>
            <div className="space-y-4 text-gray-700">
              <p>9.1 When someone visits the site, a cookie is placed on the customer&apos;s machine (if the customer accepts cookies) or is read if the customer has visited the site previously.</p>
              <p>9.2 We also use cookies to collect information on which newsletter links are clicked by customers. This information is collected in aggregate form and never linked with your Personal Data.</p>
              <p>9.3 You may configure your browser or mobile device settings to block, delete, or manage the use of cookies. Please note that disabling cookies may impair the functionality of the Tactlink Application and Services.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Cancellation of personal account</h2>
            <div className="space-y-4 text-gray-700">
              <p>10.1 (a) Upon cancellation or termination of your account, you will no longer be able to access your account. Except as otherwise required by law, your Personal Data shall be removed if so requested by you.</p>
              <p>(b) Except as otherwise required by law, your Personal Data shall be securely deleted or anonymised upon your written request.</p>
              <p>(c) To request the deletion of your Personal Data, you may contact us by sending an email to info@tactlink.com with the subject line &quot;Deletion Request&quot;.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Liability and Indemnity</h2>
            <div className="space-y-4 text-gray-700">
              <p>11.1 Except where prohibited, we shall not be liable for any indirect, special, incidental, consequential or exemplary damages arising from your use of our website of Tactlink Application.</p>
              <p>11.2 If we use your information under any circumstance other than that specified herein, we will obtain your prior consent.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Remedies</h2>
            <div className="space-y-4 text-gray-700">
              <p>12.1 In the unlikely event that your Personal Data has been or may be leaked, lost or destructed, we will take remedies within reasonably practicable time and notify you within reasonable time.</p>
              <p>12.2 If you are aware your Personal Data has been or may be leaked, please notify us in a timely manner. We will use our best efforts to take commercially reasonable measures to offer assistance.</p>
              <p>12.3 Notwithstanding the above, you shall agree that we are not liable for: (a) Information divulged due to computer virus, trojan and hacker attack; (b) Personal Data divulged because you tell your password to others; or (c) Any other divulgence of Personal Data not caused by us.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Law and Jurisdiction</h2>
            <div className="space-y-4 text-gray-700">
              <p>13.1 When you browse or use our Tactlink Application, you agree that you will comply by the laws of Singapore, and you submit to the exclusive jurisdiction of the courts of Singapore for all legal proceedings arising out of or relating to this Privacy Policy.</p>
              <p>13.2 Nothing in this Privacy Policy shall limit your rights under any mandatory consumer protection laws or data protection laws which may apply to you under applicable local laws.</p>
              <p>13.3 If any part of this Privacy Policy is found to be void, unenforceable or invalid, it shall not affect the other provisions of this Privacy Policy.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
