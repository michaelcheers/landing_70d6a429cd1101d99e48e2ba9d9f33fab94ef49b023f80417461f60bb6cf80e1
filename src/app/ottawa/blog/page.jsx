import Link from "/src/components/Link.jsx";
import OttHeader from "/src/app/components/ottawa/ottHeader.jsx";
import OttFooter from "/src/app/components/ottawa/ottFooter.jsx";
import BackgroundAboutUs from "/src/app/components/background/backgroundaboutus.jsx";
import { getAllBlogPosts } from "/src/app/data/blogPosts.js";
import { Metadata } from "/src/shims/next.js";
import "../../landing.css";



export default function OttawaBlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10000">
        <OttHeader section="residential" />
      </div>

      {/* Hero Section */}
      <div className="w-screen flex flex-col items-center pt-[60px] bg-[#F8F5EC]">
        <BackgroundAboutUs>
          <div className="flex justify-center">
            <div className="text-white p-6 md:p-10 md:pl-20 md:h-100 md:w-[1250px] flex flex-col justify-center">
              <h1 className="text-4xl font-bold py-8">Moving Tips & Advice</h1>
              <p className="text-regular font-bold">
                Expert insights and practical advice from Ottawa&apos;s trusted moving professionals
              </p>
            </div>
          </div>
        </BackgroundAboutUs>
      </div>

      {/* Blog Posts Section */}
      <div className="flex-grow w-full bg-[#F8F5EC] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    {/* Blog Post Header */}
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                        {post.readingTime && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.readingTime}</span>
                          </>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-primary mb-3 leading-tight">
                        <Link href={`/ottawa/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                    </div>

                    {/* Blog Post Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary text-white text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/ottawa/blog/${post.slug}`}
                      className="inline-flex items-center text-tertiary font-bold hover:underline"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-primary mb-4">No blog posts yet</h2>
              <p className="text-gray-600">Check back soon for expert moving tips and advice!</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#F8F5EC] text-primary p-8 text-center w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for your next move?</h2>
        <p className="mb-6">Let Moving Papa make your Ottawa move stress-free and efficient</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href="/ottawa/finalstep/residential" className="bg-tertiary px-6 py-3 font-bold rainbow-button !rounded-xl text-center">
            GET A FREE QUOTE
          </Link>
          <a href="tel:3435000488" className="bg-tertiary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            CALL US NOW
          </a>
        </div>
      </div>

      {/* Footer */}
      <OttFooter />
    </div>
  );
}
