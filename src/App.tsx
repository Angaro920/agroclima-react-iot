import { useState  } from 'react'
import { Layout } from 'antd'
import {siderStyle} from './styles.tsx'
import { MenuDashboard } from './components'

const { Header, Content, Footer, Sider } = Layout;


const App = () => {
  
  return (
    <Layout>
     <Header>
      Este es el header
     </Header>
     <Layout>
      <Sider style={siderStyle}>
        <MenuDashboard />
      </Sider>
      <Content>Aca va el contenido</Content>
     </Layout>
     <Footer>Este es el footer</Footer>
    </Layout>
  )
}

export default App
