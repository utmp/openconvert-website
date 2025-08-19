import { useEffect, useState } from 'react'
import './index.css'
import { cn } from './lib/utils'
import { GridPattern } from './components/magicui/grid-pattern'
import Navbar from './components/Navbar'
import {supabase} from './lib/supabaseClient'
import Cookies from 'js-cookie'
import { NumberTicker } from './components/magicui/number-ticker'
function App() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalUsers,setTotalUsers] = useState<number>(0)

  useEffect(()=>{
    const hasSubmitted = Cookies.get('hasSubmittedEmail')
      if(hasSubmitted){
        setIsSubmitted(true)
      }
    fetchTotalUsers()
  },[])

  const fetchTotalUsers = async () =>{
    try{
      const {count,error} = await supabase
      .from('email')
      .select('*',{count:'exact'})
      if(error){
        console.error(error)
        return
      }
      setTotalUsers( count || 0)
    }catch (error){
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    try{
      const {error} = await supabase
      .from('email')
      .insert([{email: email.trim()}])
      if(error){
        console.log(error)
        alert('Something went wrong')
        setIsLoading(false)
        return
      }
      Cookies.set('hasSubmittedEmail','true',{ expires: 365})
      setIsSubmitted(true)
      setEmail('')
      fetchTotalUsers()
    }catch (error){
      console.error(error)
      alert('Something went wrong.')
    }
    finally{
      setIsLoading(false)
    }
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
  }
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      <GridPattern 
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] ",
          )}
        />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gray-900 border border-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>In Development</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              File conversion
              <br />
              <span className="text-gray-400">made simple</span>
            </h1>

            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              The open-source desktop app for converting between 200+ file formats. 
              Private, fast, and completely free. Available in late 2025
            </p>

            <div className="max-w-md mx-auto mb-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
              ) : (
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-400">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Thanks! You're on the list.</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xl text-gray-500">
              Join <NumberTicker value={totalUsers} className="whitespace-pre-wrap text-xl font-medium tracking-tighter text-white"/> others waiting for launch
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App