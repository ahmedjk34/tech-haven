import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  BsFillMotherboardFill,
  BsGpuCard,
  BsHddFill,
  BsMemory,
  BsKeyboardFill,
  BsCpuFill,
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
            <Link
              href="https://github.com/ahmedjk34"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub /> Ahmedjk34
            </Link>
            <Link
              href="https://www.linkedin.com/in/ahmedjk34/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin /> Ahmed Gharib
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
  // Create a map of categories to their corresponding values
  const categories = new Map<string, string>([
    ["Graphics Cards", "GPU"],
    ["Processors", "CPU"],
    ["Motherboards", "Motherboard"],
    ["Memory (RAM)", "RAM"],
    ["Storage (SSD/HDD)", "Storage"],
    ["Accessories", "Accessories"],
  ]);

  const icons = [
    <BsGpuCard />,
    <BsCpuFill />,
    <BsFillMotherboardFill />,
    <BsMemory />,
    <BsHddFill />,
    <BsKeyboardFill />,
  ];

  return (
    <>
      {Array.from(categories.keys()).map((category, index) => (
        <div key={index + category}>
          {icons[index]}
          <Link href={`/search?category=${categories.get(category)}`}>
            {category}
          </Link>
        </div>
      ))}
    </>
  );
}
