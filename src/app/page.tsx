import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const guestName = params.guest || 'Dear Guest';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Валерія & Нікіта
          </h1>
          <div className="flex justify-center items-center gap-2 text-2xl text-pink-600">
            <FontAwesomeIcon icon={faHeart} className="animate-pulse" />
            <span>Joy</span>
            <FontAwesomeIcon icon={faHeart} className="animate-pulse" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <section className="text-center mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Welcome, {typeof guestName === 'string' ? guestName : 'Dear Guest'}!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are thrilled to invite you to celebrate our special day with us. 
              Your presence would make our wedding day even more meaningful and joyful.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faCalendar} className="text-pink-600 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-700">When</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Coming Soon
              </p>
              <p className="text-gray-500">
                Save the date for our special celebration
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink-600 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-700">Where</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Venue Details Coming Soon
              </p>
              <p className="text-gray-500">
                We'll share the beautiful location details with you soon
              </p>
            </section>
          </div>

          <section className="text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Love Story
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every love story is beautiful, but ours is our favorite. We can't wait to 
              begin this new chapter of our lives together, surrounded by our loved ones.
            </p>
            <div className="text-pink-600">
              <FontAwesomeIcon icon={faHeart} size="3x" className="animate-bounce" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
