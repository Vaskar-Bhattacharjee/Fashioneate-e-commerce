import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  role: string;
  inviteLink: string;
}

export const EmailTemplate = ({
  email,
  role,
  inviteLink,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Join the Veggis team as a {role}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={logo}>🥦 Veggis</Heading>
        </Section>
        
        <Section style={content} >
          <Heading style={h1}>You&apos;ve been invited!</Heading>
          <Text style={text}>
            Hello,
          </Text>
          <Text style={text}>
            An administrator has invited you to join the <strong>Veggis</strong> team as a <strong>{role}</strong>. 
            You&apos;ll be able to manage products, handle orders, and help grow the platform.
          </Text>
          
          <Button style={button} href={inviteLink}>
            Setup Your Account
          </Button>
          
          <Text style={reason}>
            This invitation was sent to <strong>{email}</strong>. The link will expire in 1 hour for security reasons.
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footerText}>
            If the button above doesn&apos;t work, copy and paste this link into your browser:
          </Text>
          <Link href={inviteLink} style={link}>
            {inviteLink}
          </Link>
        </Section>

        <Section style={footer}>
          <Text style={footerSubtext}>
            &copy; {new Date().getFullYear()} Veggis E-Commerce. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

// --- Styles ---

const main = {
  backgroundColor: "#f9fafb",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const header = {
  padding: "26px",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#16a34a", 
};

const content = {
  backgroundColor: "#f7fee7", 
  backgroundImage: "linear-gradient(to bottom, #f0fdf4 0%, #ffffff 100%)", // Subtle Greenish-White
  padding: "40px",
  borderRadius: "8px",
  border: "1px solid #e1e8e1", 
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.1",
  color: "#111827",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#374151",
};

const button = {
  backgroundColor: "#16a34a",
  borderRadius: "5px",
  color: "#e5e5e5",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px 0",
  marginTop: "25px",
  
};

const reason = {
  fontSize: "13px",
  color: "#6b7280",
  marginTop: "25px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "30px 0",
};

const link = {
  fontSize: "12px",
  color: "#16a34a",
  textDecoration: "underline",
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
  marginBottom: "10px",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const footerSubtext = {
  fontSize: "12px",
  color: "#9ca3af",
};