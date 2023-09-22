import React from 'react'
import Layout from '../../components/Layout/Layout'

import styled from 'styled-components'
import AdminMenu from './../../components/Layout/AdminMenu';
const UserOrder = () => {
  return (
    <Layout>
      <Container>
        <AdminMenu />
        <div>

        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`
export default UserOrder