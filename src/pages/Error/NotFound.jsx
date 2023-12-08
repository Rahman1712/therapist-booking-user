import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non beatae impedit qui eum, fuga quia. Dignissimos tempore impedit placeat numquam. Numquam eius facere sit libero excepturi nobis laborum esse incidunt non eos, harum distinctio ex perferendis, mollitia, impedit et officia. Recusandae blanditiis corrupti ipsum ab veniam ducimus? Id, vitae pariatur.</p>

      <p>Go to the <Link to="/">HomePage</Link>.</p>
    </div>
  )
}