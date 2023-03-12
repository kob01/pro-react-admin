import React, { useState, useEffect, useRef } from 'react'
import { Layout, FloatButton, theme } from 'antd'
import { useLocation } from 'react-router-dom'
import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { getKeyName } from '@src/utils/publicFn'
import { useProTabContext } from '@src/components/hooks/proTabsContext'
import ProBreadcrumb from './breadcrumb'
import ProTabs from '../proTabs'
import styles from './index.module.less'

const { Content, Header, Footer } = Layout

const ProContent = () => {
  const [tabActiveKey, setTabActiveKey] = useState('home')
  const { activeKey, panes } = useProTabContext()
  const [panesItem, setPanesItem] = useState({
    title: '',
    content: null,
    key: '',
    closable: false,
    path: '',
  })

  const pathRef = useRef('')
  const { pathname, search } = useLocation()
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken()
  useEffect(() => {
    const { tabKey, title, element } = getKeyName(pathname)
    const newPath = search ? pathname + search : pathname
    pathRef.current = newPath

    setPanesItem({
      title,
      content: element,
      key: tabKey,
      closable: tabKey !== '/',
      path: newPath,
    })
    setTabActiveKey(tabKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, panes, activeKey])

  return (
    <Layout className={styles.layout}>
      <Header className="layout-header" style={{ background: colorBgLayout }}>
        <ProBreadcrumb />
      </Header>
      <Content className="layout-content" style={{ background: colorBgContainer }}>
        <ProTabs panesItem={panesItem} tabActiveKey={tabActiveKey} />
      </Content>
      <Footer className="layout-footer">
        <FloatButton.BackTop target={() => document.querySelector('#container')}>
          <VerticalAlignTopOutlined style={{ fontSize: 20 }} />
        </FloatButton.BackTop>
        <div>&copy; {new Date().getFullYear()} Pro React Admin</div>
      </Footer>
    </Layout>
  )
}

export default ProContent
