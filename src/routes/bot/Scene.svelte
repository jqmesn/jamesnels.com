<script lang="ts">
  import { T } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'


  interface Props {
      autoRotate: boolean
      enableDamping: boolean
      rotateSpeed: number
      zoomToCursor: boolean
      zoomSpeed: number
      minPolarAngle: number
      maxPolarAngle: number
      enableZoom: boolean
    }
  let {
    autoRotate,
    enableDamping,
    rotateSpeed,
    zoomToCursor,
    zoomSpeed,
    minPolarAngle,
    maxPolarAngle,
    enableZoom
  }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
>

  <OrbitControls
    {enableDamping}
    {autoRotate}
    {rotateSpeed}
    {zoomToCursor}
    {zoomSpeed}
    {minPolarAngle}
    {maxPolarAngle}
    {enableZoom}
  >
    <Gizmo />
  </OrbitControls>
</T.PerspectiveCamera>

<T.GridHelper args={[10, 10]} />

<T.Mesh
  position.y={1}
>
  <T.BoxGeometry args={[2,2,2]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh>
