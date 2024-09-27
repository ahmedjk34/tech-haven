import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  BsFillMotherboardFill,
  BsGpuCard,
  BsHddFill,
  BsMemory,
  BsKeyboardFill,
  BsDisplay,
} from "react-icons/bs";
import styles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.videoContainer}>
        <iframe
          src="https://player.vimeo.com/video/1013433471?autoplay=1&loop=1&autopause=0&muted=1&badge=0&title=0&sidedock=0&controls=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          loading="lazy"
          className={styles.backgroundVideo}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.informationSection}>
          <div className={styles.siteInfo}>
            <h1>Teach Haven</h1>
            <p>
              Tech Haven is your go-to online store for high-quality PC parts
              and accessories. Whether you're a gamer or a content creator, we
              offer a wide selection of components like graphics cards,
              processors, and motherboards. With our user-friendly interface and
              competitive pricing, building your dream PC has never been easier.
              Explore Tech Haven and elevate your tech experience!
            </p>
          </div>
          <div className={styles.personalInfo}>
            <Link href={"https://github.com/ahmedjk34"}>
              <FaGithub /> Ahmedjk34
            </Link>
            <Link href={"https://www.linkedin.com/in/ahmedjk34/"}>
              <FaLinkedin />
              Ahmed Gharib
            </Link>
          </div>
        </div>
        <div className={styles.quickNavigation}>
          <h2>Quick Navigation</h2>
          {createQuickNavigationItems()}
        </div>
      </div>
    </div>
  );
}

function createQuickNavigationItems() {
  const categories = [
    "Graphics Cards",
    "Motherboards",
    "Memory (RAM)",
    "Storage (SSD/HDD)",
    "Monitors",
    "Accessories",
  ];

  const icons = [
    <BsGpuCard />,
    <BsFillMotherboardFill />,
    <BsMemory />,
    <BsHddFill />,
    <BsDisplay />,
    <BsKeyboardFill />,
  ];

  return (
    <>
      {categories.map((category, index) => (
        <div key={index} className="quick-nav-item">
          {icons[index]}
          {category}
        </div>
      ))}
    </>
  );
}
