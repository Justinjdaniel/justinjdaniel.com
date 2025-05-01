export const getMetadata = ({ title, description, path = "/" }) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://justinjdaniel.com";
  const fullUrl = `${baseUrl}${path}`;

  return {
    title: title ? `${title} | Justin J Daniel` : "Justin J Daniel",
    description,
    openGraph: {
      title: title || "Justin J Daniel",
      description,
      url: fullUrl,
      siteName: "Justin J Daniel",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(
            title || "Justin J Daniel",
          )}`,
          width: 1920,
          height: 1080,
          alt: title || "Justin J Daniel",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Justin J Daniel",
      description,
      images: [
        `${baseUrl}/api/og?title=${encodeURIComponent(
          title || "Justin J Daniel",
        )}`,
      ],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};
