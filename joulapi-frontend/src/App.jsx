import React, { useState, useRef } from "react";
import {
  Layout,
  Menu,
  Typography,
  Card,
  Tabs,
  Input,
  Button,
  message,
  Alert,
} from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const THEME_COLOR = "#ff2e2e";
const TEXT_COLOR = "#fff";
const BG_COLOR_DARK = "#000000";
const INPUT_BG = "#1a0000";

const cardStyle = {
  background: "linear-gradient(145deg, #330000, #110000)",
  borderRadius: 20,
  boxShadow: "12px 12px 24px #400000cc, -12px -12px 24px #ff2e2e44",
  color: TEXT_COLOR,
};

const get3DTransformStyle = (x, y, width, height) => {
  const rotateX = ((y - height / 2) / height) * -10;
  const rotateY = ((x - width / 2) / width) * 10;
  return `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

function NotCompletedBanner() {
  return (
    <Alert
      message="⚠️ NOT COMPLETED"
      description="This application is under active development. Features and UI may change."
      type="warning"
      showIcon
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        borderRadius: 0,
        backgroundColor: "#330000",
        borderColor: THEME_COLOR,
        color: THEME_COLOR,
      }}
      banner
      closable={false}
    />
  );
}

function HomeCards() {
  const cards = [
    {
      title: "Biometric Authentication",
      description: "Secure e-passport verification compliant with international standards.",
      icon: "🛂",
    },
    {
      title: "Network Monitoring",
      description: "Real-time network health insights with predictive alerts.",
      icon: "📡",
    },
    {
      title: "Seamless Integration",
      description: "Easy REST & GraphQL API integration with extensive documentation.",
      icon: "🔗",
    },
  ];
  const cardRefs = useRef([]);

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 32,
        paddingTop: 48,
        paddingBottom: 64,
      }}
    >
      {cards.map(({ title, description, icon }, i) => (
        <Card
          key={title}
          tabIndex={0}
          hoverable
          ref={(el) => (cardRefs.current[i] = el)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const style = get3DTransformStyle(
              e.clientX - rect.left,
              e.clientY - rect.top,
              rect.width,
              rect.height
            );
            e.currentTarget.style.transform = style;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "perspective(600px) rotateX(0deg) rotateY(0deg)";
          }}
          style={{
            ...cardStyle,
            cursor: "pointer",
            minHeight: 220,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 12,
              textAlign: "center",
              color: THEME_COLOR,
            }}
          >
            {icon}
          </div>
          <Title level={3} style={{ textAlign: "center", color: THEME_COLOR }}>
            {title}
          </Title>
          <Paragraph style={{ textAlign: "center", color: TEXT_COLOR }}>
            {description}
          </Paragraph>
        </Card>
      ))}
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      message.error("Please fill all fields.");
      return;
    }
    message.success("Form submitted (EmailJS integration goes here)");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 48 }}>
      <Title level={2} style={{ color: THEME_COLOR, marginBottom: 24 }}>
        Contact Us
      </Title>
      <Input
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        style={{
          backgroundColor: INPUT_BG,
          color: TEXT_COLOR,
          marginBottom: 16,
          borderColor: THEME_COLOR,
        }}
      />
      <Input
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        style={{
          backgroundColor: INPUT_BG,
          color: TEXT_COLOR,
          marginBottom: 16,
          borderColor: THEME_COLOR,
        }}
      />
      <TextArea
        rows={6}
        placeholder="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        style={{
          backgroundColor: INPUT_BG,
          color: TEXT_COLOR,
          marginBottom: 16,
          borderColor: THEME_COLOR,
        }}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{
          backgroundColor: THEME_COLOR,
          borderColor: THEME_COLOR,
          color: "#fff",
          width: "100%",
        }}
      >
        Send
      </Button>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: BG_COLOR_DARK,
        color: TEXT_COLOR,
      }}
    >
      <NotCompletedBanner />
      <Header
        style={{
          backgroundColor: "#110000",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ color: THEME_COLOR, flexGrow: 1 }}>
          JoulAPI
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeTab]}
          onClick={({ key }) => setActiveTab(key)}
          style={{
            backgroundColor: "transparent",
            color: TEXT_COLOR,
            fontWeight: "bold",
          }}
          items={[
            { key: "home", label: "Home" },
            { key: "features", label: "Features" },
            { key: "contact", label: "Contact" },
          ]}
        />
      </Header>
      <Content style={{ padding: "24px 48px" }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane key="home" tab="Home">
            <HomeCards />
          </TabPane>
          <TabPane key="features" tab="Features">
            <Paragraph style={{ color: TEXT_COLOR }}>Coming soon...</Paragraph>
          </TabPane>
          <TabPane key="contact" tab="Contact">
            <ContactForm />
          </TabPane>
        </Tabs>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#110000",
          color: THEME_COLOR,
        }}
      >
        © {new Date().getFullYear()} JoulAPI. All rights reserved.
      </Footer>
    </Layout>
  );
}
