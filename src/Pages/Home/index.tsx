import { Card } from 'primereact/card'

const Home = () => {
  return (
    <>
      <h1 className="text-2xl pb-6">Home</h1>
      <Card title="Projeto Final">
        <p className="m-0">
        Projeto em React JS com Tailwind, Vite e PNPM consumindo API Rest e dados vindos do MySQL.
        </p>
      </Card>
    </>
  )
}

export default Home