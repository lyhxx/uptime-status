import { useAppStore } from '../store';
import { getConfig } from '../config';

export function Footer() {
  const embedMode = useAppStore((s) => s.embedMode);
  const config = getConfig();

  if (embedMode) return null;

  // 从导航菜单中获取 GitHub 链接
  const githubLink = config.navi.find((item) =>
    item.url.includes('github.com')
  );

  return (
    <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>
        基于{' '}
        <a
          href="https://uptimerobot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          UptimeRobot
        </a>
        {' '}接口，检测频率 5 分钟
      </p>
      <p className="mt-1">
        &copy; {new Date().getFullYear()}{' '}
        {githubLink ? (
          <a
            href={githubLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            {config.siteName}
          </a>
        ) : (
          config.siteName
        )}
      </p>
    </footer>
  );
}
