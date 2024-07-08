import { Button, Modal } from 'antd'
import { useDynamicDom } from './hooks'
function App() {
  const { close, show, node, update } = useDynamicDom(Modal, {
    visible: true,
    title: '点击了几次',
    children: 0,
    onOk: () => update(p => ({
      ...p,
      children: Number(p.children) + 1
    })),
    okText: '+1',
    onCancel: () => close(),
  })

  return <div>
    <Button type="primary" onClick={show}>测试弹窗</Button>
    {node}
  </div>
}

export default App
