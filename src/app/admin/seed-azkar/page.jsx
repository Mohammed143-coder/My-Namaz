// 'use client'
// import { useState } from 'react'
// import CommonHeader from '@/components/CommonHeader'
// import { sampleAzkar } from '@/data/sampleAzkar'
// import { BiCheckCircle, BiLoader } from 'react-icons/bi'

// export default function SeedAzkarPage() {
//   const [loading, setLoading] = useState(false)
//   const [results, setResults] = useState([])
//   const [completed, setCompleted] = useState(false)

//   const seedAzkar = async () => {
//     setLoading(true)
//     setResults([])
//     setCompleted(false)

//     const newResults = []
//     let successCount = 0
//     let errorCount = 0

//     for (const azkar of sampleAzkar) {
//       try {
//         const res = await fetch('/api/azkar', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(azkar)
//         })

//         const data = await res.json()
        
//         if (data.success) {
//           successCount++
//           newResults.push({ 
//             status: 'success', 
//             message: `✓ ${azkar.transliteration}`,
//             category: azkar.category 
//           })
//         } else {
//           errorCount++
//           newResults.push({ 
//             status: 'error', 
//             message: `✗ ${azkar.transliteration} - ${data.message}`,
//             category: azkar.category 
//           })
//         }
//       } catch (error) {
//         errorCount++
//         newResults.push({ 
//           status: 'error', 
//           message: `✗ ${azkar.transliteration} - ${error.message}`,
//           category: azkar.category 
//         })
//       }

//       setResults([...newResults])
//     }

//     setLoading(false)
//     setCompleted(true)
//   }

//   const categoryCounts = {
//     'morning': sampleAzkar.filter(a => a.category === 'morning').length,
//     'evening': sampleAzkar.filter(a => a.category === 'evening').length,
//     'before-sleeping': sampleAzkar.filter(a => a.category === 'before-sleeping').length,
//     'waking-up': sampleAzkar.filter(a => a.category === 'waking-up').length,
//     'after-prayer': sampleAzkar.filter(a => a.category === 'after-prayer').length,
//     'after-adhan': sampleAzkar.filter(a => a.category === 'after-adhan').length,
//     'entering-mosque': sampleAzkar.filter(a => a.category === 'entering-mosque').length,
//     'leaving-mosque': sampleAzkar.filter(a => a.category === 'leaving-mosque').length,
//     'eating': sampleAzkar.filter(a => a.category === 'eating').length,
//     'drinking': sampleAzkar.filter(a => a.category === 'drinking').length,
//   }

//   return (
//     <div className="min-h-screen pattern-bg p-4 pb-24">
//       <div className="max-w-4xl mx-auto">
//         <CommonHeader>Seed Azkar Database</CommonHeader>

//         <div className="mt-6 card-gold p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-2">
//             🕌 Admin Tool: Populate Azkar Database
//           </h3>
//           <p className="text-gray-700 mb-4">
//             This will add <span className="font-bold text-emerald-600">{sampleAzkar.length}</span> authentic daily azkar across all 10 categories to your database.
//           </p>
          
//           <div className="bg-white rounded-lg p-4 mb-4">
//             <p className="text-sm font-semibold text-gray-700 mb-3">📊 Distribution by Category:</p>
//             <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//               <div className="flex justify-between">
//                 <span>🌅 Morning:</span>
//                 <span className="font-semibold">{categoryCounts['morning']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🌙 Evening:</span>
//                 <span className="font-semibold">{categoryCounts['evening']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🛏️ Before Sleep:</span>
//                 <span className="font-semibold">{categoryCounts['before-sleeping']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>☀️ Waking Up:</span>
//                 <span className="font-semibold">{categoryCounts['waking-up']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🤲 After Prayer:</span>
//                 <span className="font-semibold">{categoryCounts['after-prayer']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>📢 After Adhan:</span>
//                 <span className="font-semibold">{categoryCounts['after-adhan']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🕌 Enter Mosque:</span>
//                 <span className="font-semibold">{categoryCounts['entering-mosque']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🕌 Leave Mosque:</span>
//                 <span className="font-semibold">{categoryCounts['leaving-mosque']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🍽️ Eating:</span>
//                 <span className="font-semibold">{categoryCounts['eating']}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>🥤 Drinking:</span>
//                 <span className="font-semibold">{categoryCounts['drinking']}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={seedAzkar}
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold transition-all ${
//               loading
//                 ? 'bg-gray-400 text-white cursor-not-allowed'
//                 : completed
//                 ? 'bg-green-500 text-white'
//                 : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:scale-105'
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <BiLoader className="w-5 h-5 animate-spin" />
//                 Seeding Database... ({results.length}/{sampleAzkar.length})
//               </span>
//             ) : completed ? (
//               <span className="flex items-center justify-center gap-2">
//                 <BiCheckCircle className="w-5 h-5" />
//                 Seeding Completed Successfully!
//               </span>
//             ) : (
//               '🚀 Start Seeding Database'
//             )}
//           </button>
//         </div>

//         {/* Results */}
//         {results.length > 0 && (
//           <div className="mt-6 card-islamic p-6">
//             <h4 className="font-semibold text-gray-800 mb-4">
//               Progress: {results.length} / {sampleAzkar.length}
//             </h4>
//             <div className="space-y-2 max-h-96 overflow-y-auto">
//               {results.map((result, index) => (
//                 <div
//                   key={index}
//                   className={`p-3 rounded-lg text-sm ${
//                     result.status === 'success'
//                       ? 'bg-green-50 text-green-800 border-l-4 border-green-500'
//                       : 'bg-red-50 text-red-800 border-l-4 border-red-500'
//                   }`}
//                 >
//                   <span className="font-medium">{result.message}</span>
//                   <span className="text-xs ml-2 opacity-75 capitalize">
//                     ({result.category.replace(/-/g, ' ')})
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {completed && (
//           <div className="mt-6 card-gold p-6 text-center">
//             <div className="mb-4">
//               <div className="text-5xl mb-2">✅</div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                 Database Seeding Completed!
//               </h3>
//             </div>
//             <p className="text-gray-700 mb-4">
//               Successfully populated the azkar database with daily supplications.
//             </p>
//             <a 
//               href="/azkar" 
//               className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
//             >
//               📖 View Azkar Categories
//             </a>
//           </div>
//         )}

//         <div className="mt-6 card-islamic p-6">
//           <h4 className="font-semibold text-gray-800 mb-3">ℹ️ Important Notes:</h4>
//           <ul className="space-y-2 text-sm text-gray-700">
//             <li className="flex items-start gap-2">
//               <span className="text-emerald-600 mt-1">•</span>
//               <span>All azkar are from authentic Islamic sources</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-emerald-600 mt-1">•</span>
//               <span>Each dua includes Arabic text, transliteration, and translation</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-emerald-600 mt-1">•</span>
//               <span>You can run this seeding multiple times safely</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <span className="text-emerald-600 mt-1">•</span>
//               <span>After seeding, all categories will show the respective azkar</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }
