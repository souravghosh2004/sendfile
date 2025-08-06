import "./About.css"

// AboutPage Component - Designed for mobile-first responsiveness
const About = () => {
     return (
        <div className="about-page-container">
            <h2 className="about-page-title">About File Send</h2>

            <section className="about-section">
                <h3 className="section-heading">
                    <span role="img" aria-label="problem" className="emoji red">🧠</span> The Problem Today
                </h3>
                <p className="section-text">
                    In today's fast-paced world, sharing or printing files often comes with unnecessary friction and privacy risks:
                </p>
                <ul className="section-list">
                    <li><strong className="red-text">Privacy Risk:</strong> Forced to share phone numbers or emails with unknown persons or public cyber cafés.</li>
                    <li><strong className="red-text">Slow & Risky Logins:</strong> Needing to log into personal accounts (WhatsApp, Gmail, Google Drive) on public computers.</li>
                    <li><strong className="red-text">Virus & Leftover Files:</strong> Using pen drives risks viruses and leaves personal files on public machines.</li>
                    <li><strong className="red-text">Time-Consuming for Teachers:</strong> Sending files separately to each student.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3 className="section-heading">
                    <span role="img" aria-label="solution" className="emoji green">🌱</span> Our Solution: File Send
                </h3>
                <p className="section-text">
                    File Send offers an anonymous, temporary, and secure file sharing platform using unique short codes:
                </p>
                <ul className="section-list">
                    <li><strong>Upload & Get Code:</strong> Upload your file(s) and instantly receive a 6-character random code (e.g., <span className="code-text">7GHD2Q</span>).</li>
                    <li><strong>Share Anywhere:</strong> Share the code on a blackboard, WhatsApp group, or verbally.</li>
                    <li><strong>Access & Go:</strong> Anyone with the code can open, view, download, or print the file.</li>
                    <li><strong>No Login, No Personal Info:</strong> No phone number or email required for basic use.</li>
                    <li><strong>Auto-Expiry:</strong> Files auto-expire (default 24h for anonymous, max 7 days for logged-in users) keeping systems clean.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3 className="section-heading">
                    <span role="img" aria-label="users" className="emoji purple">🧑‍🏫</span> Who Benefits?
                </h3>
                <ul className="section-list">
                    <li><strong>Students:</strong> Print assignments securely at cyber cafés without logins.</li>
                    <li><strong>Teachers & Coaching Centers:</strong> Share notes and materials with entire classes easily.</li>
                    <li><strong>Cyber Café & Print Shop Owners:</strong> Streamlined printing, no leftover files, reduced virus risk.</li>
                    <li><strong>Anyone:</strong> Needing quick, private, one-time file sharing.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3 className="section-heading">
                    <span role="img" aria-label="security" className="emoji blue">🔒</span> Security & Privacy
                </h3>
                <ul className="section-list">
                    <li><strong>Strong Codes:</strong> 6-character alphanumeric codes provide over 2 billion combinations, making them nearly impossible to guess.</li>
                    <li><strong>Rate Limiting (Backend):</strong> Stops brute-force attempts.</li>
                    <li><strong>Temporary Storage:</strong> Files are stored temporarily and auto-deleted after expiry.</li>
                    <li><strong>No Personal Data Shared:</strong> Teachers and students never share personal numbers or emails.</li>
                </ul>
            </section>

            <section className="about-section">
                <h3 className="section-heading">
                    <span role="img" aria-label="use cases" className="emoji yellow">🖨️</span> Real-life Use Cases
                </h3>
                <ul className="section-list">
                    <li>A teacher uploads notes once, shares the code, and the entire class downloads without sharing phone numbers.</li>
                    <li>A student uploads an assignment and prints it at a cyber café without needing WhatsApp or Gmail login.</li>
                    <li>Cyber café owners benefit from no leftover files, no virus risk, and no daily cleanup.</li>
                    <li>Even if a user and café owner don’t know each other, files are accessible safely via code only.</li>
                </ul>
            </section>
        </div>
    );
};

export default About;


