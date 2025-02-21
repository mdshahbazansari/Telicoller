import { Helmet } from "react-helmet";

const SEO = ({ title, description }) => {
  return (
    <Helmet>
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Call Center, Customer Support, Business Solutions, Debt Collection, Inbound Requests, Md Shahbaz Ansari, Shahbaz Zazby, Search and Solve YouTube, Facebook, Instagram, GitHub" />
      <meta name="author" content="Md Shahbaz Ansari, Shahbaz Zazby, Shahbaz" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (Facebook) Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://yourwebsite.com/your-image.jpg" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Teli-Coller" />
      <meta property="og:owner" content="Md Shahbaz Ansari" />
      <meta property="og:creator" content="Shahbaz Zazby" />
      <meta property="og:locale" content="IN" />

      {/* Instagram Meta Tags */}
      <meta property="al:android:url" content="https://www.instagram.com/your_instagram_username" />
      <meta property="al:ios:url" content="https://www.instagram.com/your_instagram_username" />
      <meta property="instapp:owner_user_id" content="your_instagram_user_id" />

      {/* GitHub Meta Tags */}
      <meta property="og:see_also" content="https://github.com/your_github_username" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://yourwebsite.com/your-image.jpg" />
      <meta name="twitter:creator" content="@SearchAndSolve" />

      <meta property="al:android:url" content="https://www.instagram.com/your_instagram_username" />
<meta property="al:android:app_name" content="Instagram" />
<meta property="al:android:package" content="com.instagram.android" />
<meta property="al:ios:url" content="https://www.instagram.com/your_instagram_username" />
<meta property="al:ios:app_name" content="Instagram" />
<meta property="al:ios:app_store_id" content="389801252" />

      {/* Social Media Profile Links */}
      <link rel="me" href="https://www.facebook.com/your_facebook_profile" />
      <link rel="me" href="https://www.instagram.com/your_instagram_username" />
      <link rel="me" href="https://github.com/your_github_username" />
    </Helmet>
  );
};

export default SEO;
