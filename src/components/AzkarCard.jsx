'use client'

const AzkarCard = ({ azkar, index }) => {
  const { arabic, transliteration, translation, repetitions, benefits, reference } = azkar

  return (
    <div className="card-islamic p-6 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Arabic Text */}
      <div className="mb-4 text-center">
        <p className="arabic-text text-3xl md:text-4xl text-emerald-700 leading-relaxed">
          {arabic}
        </p>
      </div>

      {/* Transliteration */}
      <div className="mb-3">
        <p className="text-base font-semibold text-gray-800 text-center">
          {transliteration}
        </p>
      </div>

      {/* Translation */}
      <div className="mb-4 p-4 bg-amber-50 rounded-lg border-l-4 border-gold-accent">
        <p className="text-gray-700 italic leading-relaxed">
          "{translation}"
        </p>
      </div>

      {/* Repetitions */}
      {repetitions > 1 && (
        <div className="mb-3 flex items-center justify-center gap-2">
          <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold">
            Repeat: {repetitions} times
          </div>
        </div>
      )}

      {/* Benefits */}
      {benefits && (
        <div className="mb-3 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Benefits: </span>
            {benefits}
          </p>
        </div>
      )}

      {/* Reference */}
      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Reference: {reference}
        </p>
      </div>
    </div>
  )
}

export default AzkarCard
