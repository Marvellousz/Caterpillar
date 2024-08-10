import Head from 'next/head'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import PredictionForm from '../components/ui/PredictionForm'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Head>
        <title>Machine Failure Detector</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Machine Failure Detector</h1>
        <p className="text-lg mb-4">Enter features to get a prediction:</p>
        <PredictionForm />
      </main>

      <Footer />
    </div>
  )
}