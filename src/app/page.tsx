import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.videoContainer}>
        <iframe
          src="https://player.vimeo.com/video/1013433471?autoplay=1&loop=1&autopause=0&muted=1&badge=0&title=0&sidedock=0&controls=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          loading="lazy"
          className={styles.backgroundVideo}
          frameBorder="0"
        />
      </div>
    </div>
  );
}
