import { ReactPortal, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
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
  close: (delayTime?: number, visibleKey?: keyof T) => void;
  show: () => void;
  destroy: () => void;
  node: boolean | ReactPortal;
  update: React.Dispatch<React.SetStateAction<T>>
} {
  const [visible, setVisible] = useState(false)
  const [_props, setProps] = useState<T>(props)
  const Component = component
  const show = () => setVisible(true)
  const destroy = () => setVisible(false)
  /**
   * 隐藏组件
   * @param delayTime 销毁容器时延
   * @param visibleKey 组件显示的key。默认为visible
   */
  const close = (delayTime = 3000, visibleKey: keyof T = 'visible') => {
    setProps({ ..._props, [visibleKey]: false } as T)
    setTimeout(destroy, delayTime)
  }
  useEffect(() => {
    if (visible) {
      setProps(props)
    }
  }, [visible])
  const node = useMemo(
    () => visible && createPortal(<Component {...(_props as any)} />, root),
    [_props, visible, root],
  )
  return {
    show,
    close,
    destroy,
    node,
    update: setProps,
  }
}


export default useDynamicDom