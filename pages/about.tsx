import Link from 'next/link'
import Layout from '../components/Layout'

const AboutPage = () => (
  <Layout title="About">
    <div style={{ padding: "24px" }}>
      <h1>About</h1>
      <p>フロント技術の知見レベルとリレーションの可視化をします。</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </div>
    
  </Layout>
)

export default AboutPage
