import { makeAutoObservable } from 'mobx'

// TODO: Try use Object property for Info
export default class AppStore {
  constructor() {
    this._infoShow = false
    this._infoTitle = ''
    this._infoText = ''
    this._infoDuration = 0
    makeAutoObservable(this)
  }

  setInfoShow(bool) {
    this._infoShow = bool
  }
  setInfoTitle(text) {
    this._infoTitle = text
  }
  setInfoText(text) {
    this._infoText = text
  }
  setInfoDuration(t) {
    this._infoDuration = t
  }
  get infoShow() {
    return this._infoShow
  }
  get infoTitle() {
    return this._infoTitle
  }
  get infoText() {
    return this._infoText
  }
  get infoDuration() {
    return this._infoDuration
  }
}
