'use server'
import { client } from "@/lib/prisma"
import { createContact } from "./contact.action"
/**
 * fetch user 
 */
export const createBooking = async (date: string, email: string, domainId: string) => {
  let contact = await client.contact.findUnique({
    where: {
      email
    },
    select: {
      id: true,
    }
  })
  // create a new contact if there isn't one. But realistically, we should always have an existing contact;
  if (!contact) {
    contact = await client.contact.create({
      data: {
        email,
        domain: {
          connect: {
            id: domainId
          }
        }
      }
    })
  }
  try {
    // upsert contact
    const booking = await client.booking.create({
      data: {
        date,
        domain: {
          connect: {
            id: domainId
          }
        },
        contact: {
          connect: {
            id: contact.id
          }
        }
      },
      select: {
        id: true,
        date: true,
        contact: {
          select: {
            id: true,
            email: true
          }
        },
        domainId: true
      }
    })
    return booking;
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}
export const getBooking = async (id: string) => {
  try {
    const booking = await client.booking.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        date: true
      }
    })
    return booking
  } catch (err) {
    console.error(err)
  }
}

export const getBookingsSummary = async () => {
  try {
    const bookings = await client.booking.findMany({
      orderBy: {
          createdAt: 'desc'
      },
      select: {
        id: true,
        date: true,
        contact: {
          select: {
            id: true,
            email: true,
            discoveryResponses: true
          }
        },
        domain: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: 10
    })
    return bookings;
  } catch (err) {
    console.error(err)
  }
}

export const getBookingsByDomain = async (domainId: string) => {
  try {
    const bookings = await client.booking.findMany({
      where: {
        domainId
      },
      select: {
        id: true,
        date: true,
        contact: {
          select: {
            id: true,
            email: true,
          }
        },
        domain: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    if (!bookings) {
      throw new Error('Failed to get appointments for a domain')
    }
    return bookings
  } catch (err) {
    console.error(err)
  }
}

export const getBookingsByDate = async (domainId: string, date: string) => {
  const dateObj = new Date(Date.parse(date))
  try {
    const bookings = await client.booking.findMany({
      where: {
        domainId,
        date: {
          gte: new Date(dateObj.setHours(0,0,0,0)),
          lte: new Date(dateObj.setHours(23, 59, 59, 999))
        }
      },
      select: {
        id: true,
        date: true
      }
    })
    return bookings;
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}