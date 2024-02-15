import { request, gql } from 'graphql-request'

const getSlider = async ()=>{ 
    const query = gql`
    query MyQuery {
      sliders {
        name
        id
        image {
          url
        }
      }
    }
  `
  const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, query)
  return result
}


const getCategories = async ()=>{ 
  const query = gql`
  query getCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`
const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, query)
return result
}


const getBusinessList = async ()=>{ 
  const query = gql`
  query getBusinessList {
    businessLists {
      id
      email
      name
      about
      address
      contactPerson
      category {
        name
      }
      images {
        url
      }
    }
  }
`
const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, query)
return result
}


const getBusinessListByCategory = async (category)=>{ 
  const query = gql`
  query getBusinessList {
    businessLists(where: {category: {name: "${category}"}}) {
      id
      email
      name
      about
      address
      contactPerson
      category {
        name
      }
      images {
        url
      }
    }
  }
`
const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, query)
return result
}


// mutation query - creates booking in database
const createBooking = async (data)=>{ 
  
  const mutation = gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked,
         businessName: {connect: {id: "${data.businessId}"}},
          date: "${data.date}",
           time: "${data.time}",
            userEmail: "${data.userEmail}", 
            userName: "${data.userName}",
            notes: "${data.notes}"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
`
const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, mutation)
return result
}



// fetch user bookings
const getBookings = async (userEmail)=>{ 
  
  const query = gql`
  query getBookings {
    bookings(orderBy: updatedAt_DESC, where: {userEmail: "${userEmail}"}) {
      bookingStatus
      date
      id
      notes
      time
      userName
      userEmail
      businessName {
        address
        contactPerson
        email
        id
        name
        category {
          name
        }
        images {
          url
        }
        about
      }
    }
  }
  
`
const result = await request(process.env.EXPO_PUBLIC_MASTER_URL, query)
return result
}

export default {getSlider, getCategories, getBusinessList, getBusinessListByCategory, createBooking, getBookings}

