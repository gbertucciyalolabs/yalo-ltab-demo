import { voiceOrdering } from './voiceOrdering.js'
import { photoList } from './photoList.js'
import { appHandoff } from './appHandoff.js'
import { abandonedCart } from './abandonedCart.js'
import { smartNotifications } from './smartNotifications.js'
import { morningBriefing } from './morningBriefing.js'
import { smartStoreVisit } from './smartStoreVisit.js'
import { supervisorAlerts } from './supervisorAlerts.js'
import { endOfDaySummary } from './endOfDaySummary.js'

export const journeys = [
  voiceOrdering,
  photoList,
  appHandoff,
  abandonedCart,
  smartNotifications,
  morningBriefing,
  smartStoreVisit,
  supervisorAlerts,
  endOfDaySummary,
]

export {
  voiceOrdering, photoList, appHandoff, abandonedCart, smartNotifications,
  morningBriefing, smartStoreVisit, supervisorAlerts, endOfDaySummary,
}
