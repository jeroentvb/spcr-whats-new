export interface SpcrWhatsNewModalContent extends Omit<Spicetify.PopupModal.Content, 'content'> {
    content: JSX.Element;
}
