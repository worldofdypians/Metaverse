export default function $alert({title, content}) {
    window.$.alert({
        title, content,
        animateFromElement: false,
        backgroundDismiss: true
    })
}