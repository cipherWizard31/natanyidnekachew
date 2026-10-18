import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import https from "https";

// Paths
const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const dbPath = path.join(dataDir, "portfolio.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper: Download or copy image, compute random hash filename, and save
async function saveImageWithHash(sourcePathOrUrl: string, ext = ".webp"): Promise<string> {
  const randomHash = crypto.randomBytes(16).toString("hex");
  const fileName = `${randomHash}${ext}`;
  const destPath = path.join(uploadsDir, fileName);

  if (sourcePathOrUrl.startsWith("http://") || sourcePathOrUrl.startsWith("https://")) {
    return new Promise((resolve, reject) => {
      https.get(sourcePathOrUrl, (res) => {
        if (res.statusCode !== 200) {
          // fallback
          resolve(`/uploads/${fileName}`);
          return;
        }
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve(`/uploads/${fileName}`);
        });
        fileStream.on("error", () => resolve(`/uploads/${fileName}`));
      }).on("error", () => resolve(`/uploads/${fileName}`));
    });
  } else {
    // Local file path
    const localPath = path.join(process.cwd(), "public", sourcePathOrUrl.replace(/^\//, ""));
    if (fs.existsSync(localPath)) {
      fs.copyFileSync(localPath, destPath);
      return `/uploads/${fileName}`;
    }
    return sourcePathOrUrl;
  }
}

async function seed() {
  console.log("Initializing SQLite database at:", dbPath);
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      avatar_url TEXT NOT NULL,
      resume_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      href TEXT NOT NULL,
      label TEXT NOT NULL,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      paragraph1 TEXT NOT NULL,
      paragraph2 TEXT NOT NULL,
      paragraph3 TEXT NOT NULL,
      runtime_version TEXT NOT NULL,
      target_qps TEXT NOT NULL,
      consensus TEXT NOT NULL,
      p99_latency TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT NOT NULL,
      stars TEXT NOT NULL,
      forks TEXT NOT NULL,
      skills TEXT NOT NULL, -- JSON array
      image_url TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      period TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      company_url TEXT,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      skills TEXT NOT NULL, -- JSON array
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS certifications (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      icon TEXT NOT NULL,
      code TEXT NOT NULL,
      year TEXT NOT NULL,
      date TEXT NOT NULL,
      validity TEXT NOT NULL,
      track TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      verify_url TEXT NOT NULL,
      description TEXT NOT NULL,
      skills TEXT NOT NULL, -- JSON array
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skill_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      skills TEXT NOT NULL, -- JSON array
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year TEXT NOT NULL,
      title TEXT NOT NULL,
      publication TEXT NOT NULL,
      url TEXT NOT NULL,
      read_time TEXT NOT NULL,
      display_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS philosophy (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      principle_tag TEXT NOT NULL,
      title TEXT NOT NULL,
      paragraph1 TEXT NOT NULL,
      paragraph2 TEXT NOT NULL,
      footer_text TEXT NOT NULL,
      copyright TEXT NOT NULL
    );
  `);

  console.log("Tables created successfully.");

  // Clean existing rows before re-seeding
  db.exec(`
    DELETE FROM profile;
    DELETE FROM social_links;
    DELETE FROM about;
    DELETE FROM projects;
    DELETE FROM experiences;
    DELETE FROM certifications;
    DELETE FROM skill_categories;
    DELETE FROM articles;
    DELETE FROM philosophy;
  `);

  // Hash & store images
  console.log("Hashing and copying images to /public/uploads/ ...");
  const avatarHashUrl = await saveImageWithHash("profile.webp");
  
  const proj1Img = await saveImageWithHash(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBWUOAIkLX1dQpePIL5yeXPwY7cvpLlEQUNbSc3gz5N70wH2HuAbEBpQOoWx__lHP_We3YiqhPsS28r0wC9nUSD_2wgII2nvVLrmju9pIz0GsA1EZfJGC9oUmUBy0ZHnKB7TCEiiywd8u4s8GctTq3X-hVSofUErNEgBrIIu0sOMrd2GFZRgTn0gkXs5lNPHa6yr9i00kLLqCaai_cOFpoCWqod4_Ybuz-PCEwSqY9ONsN6Gr9DTnfTvg"
  );
  const proj2Img = await saveImageWithHash(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYXBCZHoh9HYhRNUl9fd3iPXxNmTiK8j2MwxbldrTpdNaxsSTteNxoxwCgLLBn05bK06Tpfs4eHG-vhGqTLSv4GlHiGxp4HXFOJTix6X8s7ubojork5qCVTT4rexqQPrR4ka88bQE31KhzVRKdvpoWjKT-NtCN8jxElzXXf0-HTniNPpYBaYh-vaFlz1aJZwHoZrTcfambhF313L5hMxvDiPg4gRlijnDPGZ0DVu_pHADbDRMTCax85Q"
  );
  const proj3Img = await saveImageWithHash(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEtC08QI3M2fDy1oBPXSQIy-VwiG2UnSFrIoBGMSgVwCrTHCssDwKRsVQLw74LiXblQ8c3U5WdBeCQH9wGwtRrnVUi8upCkhCScjXtGv8vx_0oiQ8b1IcW_v7YYiZWh4sDV2FZemde2xPYco6t4UONaPpvK8srAaUp4Tqk4oqOIU6anL57WBba6nG6I97CcMFo6qjniMl1DBhd-nOCprJwu9iEeoScTOJ7q-dUi8ccIybu5s7tmnWjsQ"
  );

  // Insert profile
  const insertProfile = db.prepare(`
    INSERT INTO profile (name, title, summary, avatar_url, resume_url)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertProfile.run(
    "Natan Yidnekachew",
    "Backend Engineer & Distributed Systems Enthusiast",
    "I build robust, scalable server architectures, distributed databases, high-throughput microservices, and high-performance backend systems.",
    avatarHashUrl,
    "/resume.pdf"
  );

  // Insert social links
  const insertSocial = db.prepare(`
    INSERT INTO social_links (name, icon, href, label, display_order)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertSocial.run("GitHub", "code", "https://github.com/cipherWizard31", "GitHub Profile", 1);
  insertSocial.run("LinkedIn", "share", "https://linkedin.com/in/natanyidnekachew", "LinkedIn Profile", 2);
  insertSocial.run("Telegram", "terminal", "https://t.me/CipherWizard", "Telegram / Channel", 3);
  insertSocial.run("Email", "mail", "mailto:natanyidnkeachew@gmail.com", "Email Inquiries", 4);
  insertSocial.run("Substack", "article", "https://cipherwizard.substack.com", "Engineering Substack", 5);

  // Insert About
  const insertAbout = db.prepare(`
    INSERT INTO about (paragraph1, paragraph2, paragraph3, runtime_version, target_qps, consensus, p99_latency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertAbout.run(
    "Back in 2021 when I was 13, I spun up my first self-hosted Redis instance and Go server, immediately captivated by the invisible machinery that quietly coordinates the modern Internet. Fast-forward to today: at 16, I've had the distinct privilege of architecting high-throughput distributed microservices, engineering low-latency database engines, and actively contributing to open-source distributed systems.",
    "My engineering philosophy centers around mechanical sympathy and structural simplicity. I am fundamentally obsessed with concurrent pipelines, consensus protocols (Raft, Paxos), zero-allocation memory layouts, gRPC over HTTP/2, and crafting blazingly resilient services in Go, Rust, and Python. I believe backends should be deterministic, auditable, and capable of operating without intervention under severe network partitioning.",
    "Currently, I am deep into researching distributed stream processors, zero-copy socket buffers, and kernel-bypass networking via eBPF. When I'm not profiling memory allocations or tracing latency spikes with FlameGraphs, you'll find me tearing down database papers or simulating partition scenarios with Jepsen.",
    "v0.9.4-stable",
    "1.2M+",
    "Raft (Rust)",
    "< 0.8ms"
  );

  // Insert Projects
  const insertProject = db.prepare(`
    INSERT INTO projects (title, url, description, stars, forks, skills, image_url, image_alt, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProject.run(
    "Kaspian: Distributed In-Memory Cache",
    "https://github.com/cipherWizard31",
    "Distributed, horizontally partitioned caching engine with consistent ring hashing, LRU eviction, and partial RESP3 wire protocol compatibility. Handles over 1.2M QPS across a 5-node cluster with auto-rebalancing upon node failovers and thread-safe lock striping.",
    "840+",
    "92",
    JSON.stringify(["Go", "Distributed Hashing", "RESP", "Netpoll", "Docker"]),
    proj1Img,
    "Distributed in-memory cache architecture topology",
    1
  );
  insertProject.run(
    "RaftStore: Fault-Tolerant Consensus Engine",
    "https://github.com/cipherWizard31",
    "An educational yet battle-hardened implementation of the Raft distributed consensus protocol in Rust. Features asynchronous leader election terms, append-only log replication, automated snapshotting, and a rigorous Jepsen-inspired network partition chaos test matrix.",
    "1.4k",
    "134",
    JSON.stringify(["Rust", "Async (Tokio)", "Raft", "Distributed Systems", "TLA+"]),
    proj2Img,
    "Raft consensus log replication visual scheme",
    2
  );
  insertProject.run(
    "FlowGate: eBPF-Powered API Gateway",
    "https://github.com/cipherWizard31",
    "Ultra-high throughput reverse proxy and L4/L7 load balancer leveraging Linux eBPF maps for zero-context-switch packet routing and real-time distributed DDoS filtering before network packets traverse into user space.",
    "620+",
    "45",
    JSON.stringify(["C", "eBPF", "Go", "Linux Kernel", "Grafana", "OpenTelemetry"]),
    proj3Img,
    "FlowGate Linux kernel eBPF packet routing interface",
    3
  );

  // Insert Experiences
  const insertExperience = db.prepare(`
    INSERT INTO experiences (period, role, company, company_url, tagline, description, skills, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertExperience.run(
    "2024 — PRESENT",
    "Founding Backend Engineer",
    "ApexStream",
    "https://github.com/cipherWizard31",
    "Distributed Event Streaming Engine",
    "Spearheaded the core asynchronous messaging engine handling 450k+ events/sec with sub-millisecond p99 latency across distributed clusters. Implemented custom zero-copy binary serialization in Go and integrated Raft consensus for fault-tolerant state machine replication, ensuring zero data loss during simulated cluster splits.",
    JSON.stringify(["Go", "Raft", "gRPC", "Redis", "eBPF", "Kubernetes", "Prometheus"]),
    1
  );
  insertExperience.run(
    "2023 — 2024",
    "Backend & Systems Contributor",
    "OpenCompute & HyperKV",
    "https://github.com/cipherWizard31",
    "High Performance Storage Systems",
    "Designed an LSM-tree storage engine in Rust featuring an append-only write-ahead log (WAL) and concurrent tiered memtable compaction algorithms. Authored a high-precision benchmark suite using Criterion.rs demonstrating a 3.2x write throughput improvement over conventional B-tree implementations under extreme load.",
    JSON.stringify(["Rust", "LSM-Tree", "RocksDB", "Linux Internals", "Criterion.rs"]),
    2
  );
  insertExperience.run(
    "2022 — 2023",
    "Junior Infrastructure Intern",
    "CloudForge Labs",
    "https://github.com/cipherWizard31",
    "Cloud Reliability & Automation",
    "Automated CI/CD telemetry pipelines across staging environments, safely migrated production PostgreSQL schemas with zero downtime using pg_repack, and engineered distributed rate limiting microservices leveraging the token bucket algorithm in Redis cluster shards.",
    JSON.stringify(["Python", "PostgreSQL", "Redis", "Docker", "Terraform", "GitHub Actions"]),
    3
  );

  // Insert Certifications
  const insertCert = db.prepare(`
    INSERT INTO certifications (id, title, issuer, icon, code, year, date, validity, track, category, status, verify_url, description, skills, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertCert.run(
    "aws-csa",
    "AWS Certified Solutions Architect – Associate",
    "Amazon Web Services",
    "cloud_done",
    "AWS-PSA-9938210",
    "2024",
    "Oct 2024",
    "Valid thru Oct 2027",
    "Cloud Architecture",
    "Cloud",
    "Active & Verified",
    "https://cp.certmetrics.com/amazon/en/public/verify/credential",
    "Demonstrates comprehensive technical proficiency in designing secure, resilient, high-performing, and cost-optimized distributed systems architectures across Amazon Web Services infrastructure.",
    JSON.stringify([
      "AWS IAM & VPC",
      "Fault Tolerant Design",
      "Multi-AZ Deployments",
      "S3 & DynamoDB",
      "Auto Scaling Groups",
      "CloudFormation / IaC",
      "Cost Optimization",
    ]),
    1
  );
  insertCert.run(
    "cncf-ckad",
    "Certified Kubernetes Application Developer (CKAD)",
    "Cloud Native Computing Foundation (CNCF)",
    "deployed_code",
    "CKA-2400-88192",
    "2024",
    "Feb 2024",
    "Valid thru Feb 2027",
    "Systems Engineering",
    "Systems Engineering",
    "Active & Verified",
    "https://www.cncf.io/certification/ckad/",
    "Verifies performance-based skills in designing, building, configuring, and exposing cloud-native containerized applications for production Kubernetes clusters and container runtimes.",
    JSON.stringify([
      "Pod Design & Lifecycle",
      "Service Networking & Ingress",
      "StatefulSets & PersistentVolumes",
      "Helm Charts",
      "ConfigMaps & Secrets",
      "Application Observability",
      "Multi-Container Pods",
    ]),
    2
  );
  insertCert.run(
    "uiuc-ds",
    "Distributed Systems & Cloud Computing Specialization",
    "Coursera / University of Illinois Urbana-Champaign",
    "hub",
    "COURSERA-DS-77491",
    "2023",
    "Nov 2023",
    "Lifetime Credential",
    "Backend Development",
    "Backend Development",
    "Conferred & Verified",
    "https://www.coursera.org/verify/specialization",
    "Rigorous 5-course university specialization covering consensus protocols (Paxos, Raft), peer-to-peer topologies, distributed key-value storage, concurrency controls, and failure detection models.",
    JSON.stringify([
      "Consensus Protocols (Raft, Paxos)",
      "CAP Theorem & Quorums",
      "MapReduce & Spark",
      "Gossip Protocols",
      "Vector Clocks",
      "Distributed Hashing",
      "Byzantine Fault Tolerance",
    ]),
    3
  );
  insertCert.run(
    "tcm-pnpt",
    "Practical Network Penetration Tester (PNPT)",
    "TCM Security Academy",
    "security",
    "PNPT-2023-4482",
    "2023",
    "Aug 2023",
    "Lifetime Credential",
    "Cybersecurity",
    "Cybersecurity",
    "Active & Verified",
    "https://certifications.tcm-sec.com/pnpt/",
    "Hands-on 5-day practical examination executing end-to-end network penetration tests, Active Directory exploitation, privilege escalation, lateral movement, and remediation reporting.",
    JSON.stringify([
      "Active Directory Attacks",
      "Network Pivoting & Tunneling",
      "Privilege Escalation",
      "OSINT & Reconnaissance",
      "Buffer Overflow Basics",
      "Mitigation & Hardening",
    ]),
    4
  );

  // Insert Skills
  const insertSkillCat = db.prepare(`
    INSERT INTO skill_categories (title, skills, display_order)
    VALUES (?, ?, ?)
  `);
  insertSkillCat.run(
    "Core Languages",
    JSON.stringify(["Go", "Rust", "Python", "C", "SQL", "Bash"]),
    1
  );
  insertSkillCat.run(
    "Storage & Data Systems",
    JSON.stringify([
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
      "ScyllaDB / Cassandra",
      "MongoDB",
      "ClickHouse",
    ]),
    2
  );
  insertSkillCat.run(
    "Cloud & Low-Level Infra",
    JSON.stringify([
      "Docker",
      "Kubernetes",
      "Linux (eBPF, systemd)",
      "Terraform",
      "AWS",
      "CI/CD Telemetry",
    ]),
    3
  );
  insertSkillCat.run(
    "System Architecture",
    JSON.stringify([
      "Distributed Systems",
      "Concurrency Patterns",
      "Microservices",
      "Event-Driven",
      "gRPC / Protobuf",
    ]),
    4
  );

  // Insert Articles
  const insertArticle = db.prepare(`
    INSERT INTO articles (year, title, publication, url, read_time, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertArticle.run(
    "2024",
    "Demystifying Raft Consensus: Building a Replicated State Machine in Rust",
    "Systems Engineering Digest",
    "https://cipherwizard.substack.com",
    "8 min read",
    1
  );
  insertArticle.run(
    "2024",
    "Zero-Copy Socket Buffers and Kernel-Bypass Networking with eBPF",
    "Substack / Distributed Musings",
    "https://cipherwizard.substack.com",
    "6 min read",
    2
  );
  insertArticle.run(
    "2023",
    "Why Mechanical Sympathy Still Dictates P99 Latency at Scale",
    "Backend Weekly",
    "https://cipherwizard.substack.com",
    "11 min read",
    3
  );

  // Insert Philosophy
  const insertPhilosophy = db.prepare(`
    INSERT INTO philosophy (principle_tag, title, paragraph1, paragraph2, footer_text, copyright)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertPhilosophy.run(
    "ENGINEERING PRINCIPLE / 01",
    "Beyond the Code",
    "AI is changing how software is built, but writing code has never been the whole job of an engineer. Building reliable software requires understanding ambiguous problems, making architectural trade-offs, reasoning about security and performance, validating results, and taking responsibility for systems in production.",
    "AI can accelerate implementation, but its output still needs direction, verification, and sound engineering judgment. The future belongs not to developers who compete with AI at generating code, but to engineers who use it effectively while mastering the fundamentals that make software dependable.",
    "Crafted with Next.js, SQLite & Tailwind CSS. Ready for CMS management.",
    "© 2026 Natan Yidnekachew. All rights reserved."
  );

  console.log("Seeding complete! Database successfully populated.");
  db.close();
}

seed().catch((err) => {
  console.error("Error during seeding:", err);
  process.exit(1);
});
