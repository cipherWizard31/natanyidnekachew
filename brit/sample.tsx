import { useEffect, useState } from 'react';
import './index.css';

const asset = 'https://ext.same-assets.com/1031784112/';

function Arrow({ external = false }: { external?: boolean }) {
    return external ? <svg className="arrow external" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const socials = [
    { label: 'GitHub', href: 'https://github.com/bchiang7', icon: '384164833.svg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bchiang7/', icon: '279141222.svg' },
    { label: 'CodePen', href: 'https://codepen.io/bchiang7', icon: '414062748.svg' },
    { label: 'Instagram', href: 'https://instagram.com/bchiang7', icon: '2928552792.svg' },
    { label: 'Goodreads', href: 'https://www.goodreads.com/user/show/143480747-brittany-chiang', icon: '3382591473.svg' },
];

const jobs = [
    { date: '2024 — Present', title: 'Senior Frontend Engineer, Accessibility', company: 'Klaviyo', href: 'https://www.klaviyo.com', description: 'Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.', tags: ['JavaScript', 'TypeScript', 'React', 'Storybook'] },
    { date: '2018 — 2024', title: 'Lead Engineer', company: 'Upstatement', href: 'https://upstatement.com', description: 'Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.', tags: ['JavaScript', 'TypeScript', 'HTML & SCSS', 'React', 'Next.js', 'React Native', 'WordPress', 'Contentful', 'Node.js', 'PHP'] },
    { date: 'July — Dec 2017', title: 'UI Engineer Co-op', company: 'Apple', href: 'https://www.apple.com/apple-music/', description: 'Developed and styled interactive web apps for Apple Music, including the user interface of Apple Music’s embeddable web player widget for in-browser user authorization and full song playback.', links: [{ label: 'MusicKit.js', href: 'https://developer.apple.com/documentation/musickitjs' }, { label: '9to5Mac', href: 'https://9to5mac.com/2018/06/03/apple-music-embeddable-web-player-listen-browser/' }, { label: 'The Verge', href: 'https://www.theverge.com/2017/10/5/16433770/facebook-messenger-apple-music-bot-song-streaming' }], tags: ['Ember', 'SCSS', 'JavaScript', 'MusicKit.js'] },
    { date: '2016 — 2017', title: 'Developer', company: 'Scout Studio', href: 'https://scout.camd.northeastern.edu/', description: 'Collaborated with other student designers and engineers on pro-bono projects to create new brands, design systems, and websites for organizations in the community.', tags: ['Jekyll', 'SCSS', 'JavaScript', 'WordPress'] },
    { date: 'July — Dec 2016', title: 'Software Engineer Co-op', company: 'Starry', href: 'https://starry.com/', description: 'Worked with the UI team to engineer and improve major features of Starry’s customer-facing Android app.', links: [{ label: 'Android App', href: 'https://play.google.com/store/apps/details?id=com.starry.management&hl=en_US&gl=US' }, { label: 'ScreenTime 2.0', href: 'https://starry.com/blog/product/whats-new-screentime-just-got-better-for-parents' }], tags: ['Cordova', 'Backbone', 'JavaScript', 'CSS'] },
    { date: 'July — Dec 2015', title: 'Creative Technologist Co-op', company: 'MullenLowe U.S.', href: 'https://us.mullenlowe.com/', description: 'Developed, maintained, and shipped production code for client websites. Clients included JetBlue, Lovesac, U.S. Cellular, U.S. Department of Defense, and more.', tags: ['HTML', 'CSS', 'JavaScript', 'jQuery'] },
];

const projects = [
    { title: 'Build a Spotify Connected App', href: 'https://www.newline.co/courses/build-a-spotify-connected-app', description: 'Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.', image: '273036621.png', alt: 'Build a Spotify Connected App Newline course marketing card' },
    { title: 'Spotify Profile', href: 'https://spotify-profile.herokuapp.com/', description: 'Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.', image: '3309658228.png', alt: 'Spotify Profile app homepage', tags: ['React', 'Express', 'Spotify API', 'Heroku'], metric: '719', metricHref: 'https://github.com/bchiang7/spotify-profile' },
    { title: 'Halcyon Theme', href: 'https://halcyon-theme.netlify.app/', description: 'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.', image: '888722697.png', alt: 'Halcyon Theme homepage hero with screenshot of VS Code editor', metric: '100k+ Installs', metricHref: 'https://marketplace.visualstudio.com/items?itemName=brittanychiang.halcyon-vscode' },
    { title: 'brittanychiang.com (v4)', href: 'https://v4.brittanychiang.com/', description: 'An old portfolio site built with Gatsby with 6k+ stars and 3k+ forks', image: '154112049.png', alt: 'brittanychiang.com version 4 hero section', tags: ['Gatsby', 'Styled Components', 'Netlify'], metric: '8,290', metricHref: 'https://github.com/bchiang7/v4' },
];

const writing = [
    { year: '2026', title: 'Welcome to the AI Parade', href: 'https://medium.com/@bchiang7/welcome-to-the-ai-parade-765f79b00c30', image: '67951226.png', alt: 'Welcome to the AI Parade article art' },
    { year: '2024', title: '5 Common Accessibility Pitfalls and How to Avoid Them', href: 'https://klaviyo.tech/5-common-accessibility-pitfalls-and-how-to-avoid-them-e316dfc55ff0', image: '2732681385.jpeg', alt: 'Accessibility icon' },
    { year: '2020', title: 'Integrating Algolia Search with WordPress Multisite', href: 'https://medium.com/stories-from-upstatement/integrating-algolia-search-with-wordpress-multisite-e2dea3ed449c', image: '3555572024.png', alt: 'Telescope illustration' },
    { year: '2019', title: 'Building a Headless Mobile App CMS From Scratch', href: 'https://medium.com/stories-from-upstatement/building-a-headless-mobile-app-cms-from-scratch-bab2d17744d9', image: '3863112496.jpeg', alt: 'Headless horseman illustration' },
];

const archive = [
    ['2023', 'Emerson Collective', 'Upstatement', 'Next.js, TypeScript, SCSS, Contentful', 'https://www.emersoncollective.com/', 'emersoncollective.com'],
    ['2023', 'Harvard Business School Next.js Site', 'Upstatement', 'React, TypeScript, Next.js, Contentful', 'https://www.hbs.edu/', 'hbs.edu'],
    ['2022', 'Harvard Business School Design System', 'Upstatement', 'Storybook, React, TypeScript', '', ''],
    ['2022', 'Threadable', 'Upstatement', 'React Native, Ruby on Rails, Firebase', 'https://apps.apple.com/app/apple-store/id1550995547', 'apps.apple.com'],
    ['2022', 'Pratt', 'Upstatement', 'WordPress, Timber, WordPress Multisite, Gutenberg, JavaScript', 'https://www.pratt.edu/', 'pratt.edu'],
    ['2022', 'Everytown Gun Law Rankings', 'Upstatement', 'WordPress, Timber, PHP, Airtable API', 'https://everytownresearch.org/rankings/', 'everytownresearch.org/rankings'],
    ['2021', 'Koala Health', 'Upstatement', 'Next.js, TypeScript, Redux Toolkit, Stripe, Algolia, Firebase Auth, Formik, Vercel', 'https://www.koala.health/', 'koala.health'],
    ['2021', 'Philadelphia Inquirer Sports Scoreboards', 'Upstatement', 'React, TypeScript, Stats Perform API', 'https://www.inquirer.com/sports/', 'inquirer.com/sports'],
    ['2021', 'Vanderbilt Design System', 'Upstatement', 'Twig, Puppy, JavaScript', 'https://www.vanderbilt.edu/', 'vanderbilt.edu'],
    ['2020', 'Michelle Wu for Boston Grassroots Toolkit', 'Upstatement', 'Gatsby, Styled Components', 'https://toolkit.michelleforboston.com/', 'toolkit.michelleforboston.com'],
    ['2020', 'The 19th News', 'Upstatement', 'WordPress, Timber, Gutenberg, PHP, JavaScript, Mailchimp, AMP', 'https://19thnews.org/', '19thnews.org'],
    ['2020', 'Upstatement’s WordPress Starter Kit', 'Upstatement', 'WordPress, Timber, Gutenberg, PHP, JavaScript', '', ''],
    ['2020', 'Northeastern CSSH', 'Upstatement', 'WordPress, Timber, WordPress Multisite, PHP, Algolia, JavaScript', 'https://cssh.northeastern.edu/', 'cssh.northeastern.edu'],
    ['2020', 'Integrating Algolia Search with WordPress Multisite', 'Upstatement', 'Algolia, WordPress, PHP', 'https://medium.com/stories-from-upstatement/integrating-algolia-search-with-wordpress-multisite-e2dea3ed449c', 'medium.com'],
    ['2020', 'Time to Have More Fun', '', 'Next.js, Tailwind CSS, Firebase', 'https://time-to-have-more-fun.now.sh/', 'time-to-have-more-fun.now.sh'],
    ['2019', 'Upstatement.com', 'Upstatement', 'Nuxt, Vue, Prismic', 'https://www.upstatement.com/', 'upstatement.com'],
    ['2019', 'Building a Headless Mobile App CMS From Scratch', 'Upstatement', 'Node, Express, Firebase, Vue', 'https://medium.com/stories-from-upstatement/building-a-headless-mobile-app-cms-from-scratch-bab2d17744d9', 'medium.com'],
    ['2019', 'Moms Demand Action Mobile App', 'Upstatement', 'NativeScript Vue, iOS, Android', 'https://www.upstatement.com/work/moms-demand-action/', 'Case Study'],
    ['2019', 'OctoProfile', '', 'Next.js, Chart.js, GitHub API', 'https://octoprofile.now.sh', 'octoprofile.now.sh'],
    ['2018', 'Google Keep Clone', '', 'Vue, Firebase', 'https://github.com/bchiang7/google-keep-vue-firebase', 'GitHub'],
    ['2018', 'Spotify Profile', '', 'React, Express, Styled Components', 'https://spotify-profile.herokuapp.com/', 'spotify-profile.herokuapp.com'],
    ['2018', 'Devoted Health', 'Upstatement', 'Gatsby, TypeScript, Algolia', 'https://www.devoted.com/', 'devoted.com'],
    ['2018', 'Flagship Pioneering', 'Upstatement', 'Craft CMS, Chart.js', 'https://www.flagshippioneering.com/', 'flagshippioneering.com'],
    ['2018', 'Upstatement ESLint Config', 'Upstatement', 'ESLint', 'https://www.npmjs.com/package/@upstatement/eslint-config', 'npmjs.com'],
    ['2018', 'Upstatement Prettier Config', 'Upstatement', 'Prettier', 'https://www.npmjs.com/package/@upstatement/prettier-config', 'npmjs.com'],
    ['2018', 'blistabloc', 'Scout', 'WordPress, Timber, WooCommerce', '', ''],
    ['2018', 'Spotify’s Top Tracks of 2017', 'Northeastern', 'R, Spotify API', 'https://github.com/bchiang7/spotify-top-tracks-2017', 'GitHub'],
    ['2017', 'Halcyon Theme', '', 'VS Code, Sublime Text, Atom, iTerm2, Hyper', 'https://halcyon-theme.netlify.com/', 'halcyon-theme.netlify.com'],
    ['2017', 'Apple Music - MusicKit JS', 'Apple', 'JavaScript', 'https://developer.apple.com/documentation/musickitjs', 'developer.apple.com'],
    ['2017', 'Apple Music Embeddable Web Player Widget', 'Apple', 'MusicKit.js, JavaScript, SCSS', 'https://tools.applemusic.com/en-us', 'tools.applemusic.com'],
    ['2017', 'Apple Music Facebook Messenger Integration', 'Apple', 'Ember, JavaScript, SCSS', 'https://www.theverge.com/2017/10/5/16433770/facebook-messenger-apple-music-bot-song-streaming', 'theverge.com'],
    ['2017', 'Personal Website V3', '', 'Jekyll, SCSS, JavaScript', 'https://v3.brittanychiang.com/', 'v3.brittanychiang.com'],
    ['2017', 'Interventions', 'Scout', 'Jekyll, SCSS, JavaScript', 'https://interventions.design/', 'interventions.design'],
    ['2017', 'Lonely Planet DBMS', 'Northeastern', 'Python, MySQL, Flask, JavaScript', 'https://github.com/bchiang7/CS3200-Project', 'GitHub'],
    ['2017', 'myNEU Redesign', 'Northeastern', 'Jekyll, SCSS, JavaScript', 'https://bchiang7.github.io/Redesign-myNEU/', 'bchiang7.github.io/Redesign-myNEU'],
    ['2017', 'Crowd DJ', 'HackBeanpot 2017', 'React, Firebase, Spotify API', 'https://github.com/crowddj/crowddj-react', 'GitHub'],
    ['2016', 'Personal Website V2', '', 'Jekyll, SCSS, JavaScript', 'https://v2.brittanychiang.com/', 'v2.brittanychiang.com'],
    ['2016', 'Weather Widget', '', 'Node, Express, EJS', 'https://github.com/bchiang7/DemoWebApp', 'GitHub'],
    ['2016', 'Screentime 2.0', 'Starry', 'Cordova, Backbone, Marionette', 'https://starry.com/blog/product/whats-new-screentime-just-got-better-for-parents', 'starry.com'],
    ['2016', 'React Profile', '', 'React, CSS', 'https://bchiang7.github.io/react-profile/', 'bchiang7.github.io/react-profile'],
    ['2016', 'CourseSource', 'Northeastern', 'Angular, Node, Express, MongoDB', 'https://github.com/bchiang7/WebDevSpring2016/tree/master/public/project', 'GitHub'],
    ['2016', 'Personal Website V1', '', 'HTML, CSS, JavaScript, Bootstrap', 'https://v1.brittanychiang.com/', 'v1.brittanychiang.com'],
    ['2016', 'Fontipsums', '', 'HTML, SCSS', 'http://bchiang7.github.io/fontipsums/', 'bchiang7.github.io/fontipsums'],
    ['2015', 'NU Women in Tech', 'Northeastern', 'Jekyll, Bootstrap', 'https://nuwit.ccs.neu.edu/', 'nuwit.ccs.neu.edu'],
    ['2015', 'One Card For All', 'MullenLowe', 'HTML, SCSS, JavaScript, jQuery', '', ''],
    ['2015', 'JetBlue HumanKinda', 'MullenLowe', 'Tumblr, HTML, CSS, JavaScript', '', ''],
];

function ExternalLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
    return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function Home() {
    const [active, setActive] = useState('about');
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if (visible[0]) setActive(visible[0].target.id);
        }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
        ['about', 'experience', 'projects'].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, []);

    return <div className="home page-shell" id="content">
        <header className="sidebar">
            <div>
                <h1><a href="/">Brittany Chiang</a></h1>
                <h2>Frontend Engineer</h2>
                <p className="tagline">I build accessible, pixel-perfect<br className="desktop-break" /> experiences for the web.</p>
                <nav className="section-nav" aria-label="In-page navigation">
                    {['about', 'experience', 'projects'].map(id => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}><span className="nav-rule" /> <span>{id}</span></a>)}
                </nav>
            </div>
            <ul className="socials">{socials.map(s => <li key={s.label}><ExternalLink href={s.href} className="social-link"><img src={asset + s.icon} alt="" /><span className="sr-only">{s.label}</span></ExternalLink></li>)}</ul>
        </header>
        <main className="main-content">
            <section id="about" className="about section" aria-label="About"><h2 className="mobile-heading">About</h2>
                <p>Hi there! I'm Brittany, and I like building things. I'm a frontend engineer with expertise in crafting <strong>accessible, pixel-perfect user interfaces</strong>. I take pride in creating thoughtful, inclusive products and have a sharp eye for the little details that separate a good product from an exceptional one. I enjoy working most at the intersection of design and engineering, where great user experience meets clean, scalable code.</p>
                <p>Currently, I'm a Senior Frontend Engineer at <ExternalLink href="https://www.klaviyo.com/" className="text-link">Klaviyo</ExternalLink>, where I work on our design system and help build new products, like <ExternalLink href="https://www.klaviyo.com/composer" className="text-link">Composer</ExternalLink>. I lead engineering efforts across our component library and frontend platform, partnering closely with designers and engineers to ensure accessibility is built into the foundation of everything we ship.</p>
                <p>In my spare time, you can usually find me climbing, playing tennis, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds.</p>
            </section>
            <section id="experience" className="section list-section" aria-label="Experience"><h2 className="mobile-heading">Experience</h2>
                <ol className="item-list">{jobs.map(job => <li key={job.company} className="entry"><div className="entry-date">{job.date}</div><div className="entry-body"><h3><ExternalLink href={job.href} className="entry-title">{job.title} · {job.company}<Arrow external /></ExternalLink></h3><p>{job.description}</p>{job.links && <div className="support-links">{job.links.map(link => <ExternalLink key={link.label} href={link.href}><Arrow external />{link.label}</ExternalLink>)}</div>}<ul className="tags">{job.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></li>)}</ol>
                <a className="more-link" href="https://brittanychiang.com/resume.pdf" target="_blank" rel="noreferrer">View Full Résumé <Arrow /></a>
            </section>
            <section id="projects" className="section list-section" aria-label="Projects"><h2 className="mobile-heading">Projects</h2>
                <ul className="item-list">{projects.map(project => <li key={project.title} className="entry project-entry"><div className="project-image"><img src={asset + project.image} alt={project.alt} loading="lazy" /></div><div className="entry-body"><h3><ExternalLink href={project.href} className="entry-title">{project.title}<Arrow external /></ExternalLink></h3><p>{project.description}</p>{project.metric && <ExternalLink href={project.metricHref!} className="metric"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7 15.46 7.7l7.73 1.12-5.6 5.46 1.33 7.7L12 18.35l-6.92 3.63 1.32-7.7L.8 8.82 8.54 7.7z" /></svg>{project.metric}</ExternalLink>}{project.tags && <ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}</div></li>)}</ul>
                <a className="more-link" href="/archive">View Full Project Archive <Arrow /></a>
            </section>
            <section id="writing" className="section list-section writing-section" aria-label="Writing"><h2 className="mobile-heading">Writing</h2>
                <ul className="item-list">{writing.map(article => <li key={article.title} className="entry project-entry writing-entry"><div className="project-image"><img src={asset + article.image} alt={article.alt} loading="lazy" /></div><div className="entry-body"><span className="writing-year">{article.year}</span><h3><ExternalLink href={article.href} className="entry-title">{article.title}<Arrow external /></ExternalLink></h3></div></li>)}</ul>
            </section>
            <footer>Loosely designed in <ExternalLink href="https://www.figma.com/">Figma</ExternalLink> and coded in <ExternalLink href="https://code.visualstudio.com/">Visual Studio Code</ExternalLink> by yours truly. Built with <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> and <ExternalLink href="https://tailwindcss.com/">Tailwind CSS</ExternalLink>, deployed with <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>. All text is set in the <ExternalLink href="https://rsms.me/inter/">Inter</ExternalLink> typeface.</footer>
        </main>
    </div>;
}

function Archive() {
    return <main className="archive-page page-shell" id="content"><a className="back-link" href="/"><span>←</span> Brittany Chiang</a><h1>All Projects</h1><div className="archive-table-wrap"><table><thead><tr><th>Year</th><th>Project</th><th>Made at</th><th>Built with</th><th>Link</th></tr></thead><tbody>{archive.map(([year, name, madeAt, builtWith, href, link], i) => <tr key={`${name}-${i}`}><td className="archive-year">{year}</td><td className="archive-name">{href ? <ExternalLink href={href}>{name}<Arrow external /></ExternalLink> : name}</td><td className="archive-made">{madeAt}</td><td className="archive-built"><div className="tags">{builtWith.split(', ').map(tag => <span key={tag}>{tag}</span>)}</div></td><td className="archive-url">{href && <ExternalLink href={href}>{link}<Arrow external /></ExternalLink>}</td></tr>)}</tbody></table></div></main>;
}

function App() {
    useEffect(() => {
        const move = (e: MouseEvent) => document.documentElement.style.setProperty('--mouse-glow', `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29,78,110,.15), transparent 80%)`);
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);
    return <><a className="skip-link" href="#content">Skip to Content</a>{window.location.pathname.replace(/\/$/, '') === '/archive' ? <Archive /> : <Home />}</>;
}

export default App;
