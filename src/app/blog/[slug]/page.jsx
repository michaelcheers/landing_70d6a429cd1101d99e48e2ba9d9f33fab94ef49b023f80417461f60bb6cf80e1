import { notFound } from "/src/router/Router.jsx";
import { Metadata } from "/src/shims/next.js";
import Link from "/src/components/Link.jsx";
import Image from "/src/components/Image.jsx";
import Header from "/src/app/components/header.jsx";
import Footer from "/src/app/components/footer.jsx";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.jsx";
import { getBlogPostBySlug, getAllBlogPosts } from "/src/app/data/blogPosts.js";
import residentialMovingImg from '/src/images/packingImg.jpg';
import packingImg from '/src/images/onur.webp';
import truckImg from '/src/images/elyse.webp';
import "../../landing.css";

// Image mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const imageMap: { [key: string]: any } = {
  'residentialMovingImg.jpg': residentialMovingImg,
  'packingImg.jpg': packingImg,
  'truck_img.webp': truckImg,
};

// Generate static params for all blog posts


// Generate metadata for each blog post
: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - Moving Papa',
      description: 'The requested blog post was not found.'
    };
  }
  
  return {
    title: `${post.title} | Moving Papa Blogs`,
    description: post.excerpt,
    keywords: post.tags?.join(', ') || 'moving tips, Toronto movers, Moving Papa',
    openGraph: {
      title: `${post.title} | Moving Papa Blogs`,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Convert markdown-style content to HTML-like JSX
  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers (## Header)
      if (paragraph.startsWith('## ')) {
        const headerText = paragraph.replace('## ', '');
        return (
          <h2 key={index} className="text-2xl font-bold text-primary mb-4 mt-8">
            {headerText}
          </h2>
        );
      }
      
      // Handle regular paragraphs
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10000">
      </div>

      {/* Hero Section */}
      <div className="w-screen flex flex-col items-center pt-[60px] bg-[#F8F5EC]">
        <BackgroundAboutUs>
          <div className="flex justify-center">
            <div className="text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center">
              <div className="mb-4">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center bg-tertiary text-white px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blogs
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold py-4 leading-tight">{post.title}</h1>
              <div className="flex items-center text-gray-200 text-sm">
                <span>By {post.author}</span>
                <span className="mx-3">•</span>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                {post.readingTime && (
                  <>
                    <span className="mx-3">•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </BackgroundAboutUs>
      </div>

      {/* Blog Post Content */}
      <div className="flex-grow w-full bg-[#F8F5EC] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-200">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-primary text-white text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Blog Post Image */}
            {post.image && (
              <div className="mb-8">
                <Image
                  src={imageMap[post.image] || packingImg}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-112 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>

            {/* Author & Date Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-primary mb-2">About the Author</h3>
                <p className="text-gray-600">
                  <strong>{post.author}</strong> - Moving Papa&apos;s team of professional movers brings years of experience 
                  helping Toronto families and businesses with their relocation needs. We&apos;re committed to sharing our 
                  expertise to make your move as smooth as possible.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-tertiary font-bold hover:underline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Blogs
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#F8F5EC] text-primary p-8 text-center w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience professional moving?</h2>
        <p className="mb-6">Get your free quote from Toronto&apos;s trusted moving experts</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/finalstep/residential" className="bg-tertiary px-6 py-3 font-bold rainbow-button !rounded-xl text-center">
            GET A FREE QUOTE
          </Link>
          <a href="tel:6472518188" className="bg-tertiary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            CALL US NOW
          </a>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}