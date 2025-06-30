export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/YOUR_EMAIL@gmail.com"
      method="POST"
      className="space-y-4 bg-neutral-900 p-6 rounded-xl shadow-md"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input
        type="text"
        name="name"
        placeholder="Adınız"
        required
        className="w-full px-4 py-2 rounded bg-neutral-800 text-white"
      />
      <input
        type="email"
        name="email"
        placeholder="E-posta"
        required
        className="w-full px-4 py-2 rounded bg-neutral-800 text-white"
      />
      <textarea
        name="message"
        placeholder="Mesajınız"
        required
        className="w-full px-4 py-2 h-32 rounded bg-neutral-800 text-white"
      ></textarea>
      <button
        type="submit"
        className="w-full py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300"
      >
        Gönder
      </button>
    </form>
  )
}
