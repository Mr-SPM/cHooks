# useDynamicDom
动态插入DOM节点至目标容器
- 无需手动维护冗余state
- 快捷使用打开/关闭容器  
- 容器销毁时，内部状态自动销毁
- react18推荐用法  
使用方法如下
 
```tsx
/**
 * 
 * @param component React组件
 * @param props 组件Props
 * @param root 插入容器，默认document.body
 * @returns 
 * close 关闭容器，（delayTime, visibleKey） => void  delayTime 为延时关闭组件时间，默认会先立即更新visibleKey为false，再延时执行关闭
 * show 打开容器
 * destory 直接销毁容器
 * node 容器结构Node
 * update 更新props
 */
function useDynamicDom<T extends Record<string, any>>(
  component: React.ComponentType<T>,
  props: T,
  root = document.body,
): {
  close: () => void;
  show: () => void;
  destroy: () => void;
  node: boolean | ReactPortal;
  
```

## Demo
```tsx
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
```