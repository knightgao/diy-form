<script  lang="ts">
export default {
    props: {
        render: {
            type: Function,
            default: () => null,
        },
    },
    setup(props, { slots, emit, attrs }) {
        return () => props.render(props, { slots, emit, attrs })
    }
}
</script>
