import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import styled from 'styled-components'

const Users = () => {
  return (
    <Layout>
      <Container>
        <AdminMenu />
        <div>
          Users
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`
export default Users