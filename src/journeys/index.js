import { voiceOrdering } from './voiceOrdering.js'
import { photoList } from './photoList.js'
import { appHandoff } from './appHandoff.js'
import { abandonedCart } from './abandonedCart.js'
import { smartNotifications } from './smartNotifications.js'

export const journeys = [
  voiceOrdering,
  photoList,
  appHandoff,
  abandonedCart,
  smartNotifications,
]

export { voiceOrdering, photoList, appHandoff, abandonedCart, smartNotifications }
